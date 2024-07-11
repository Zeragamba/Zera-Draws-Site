use std::fmt::{Display, Formatter};

use axum::{http::StatusCode, Router, routing::get};
use axum::body::Body;
use axum::extract::Path;
use axum::http::{header, Request};
use axum::response::Response;
use axum_server::tls_rustls::RustlsConfig;
use dotenv::dotenv;

use post_controller::PostCtrl;

use crate::config::FeatureFlag::{Disabled, Enabled};
use crate::injector::{inject_default_meta, InjectorConfig};

mod client;
mod config;
mod injector;
mod open_graph;
mod post_controller;
mod serde;
mod server;

pub enum Error {
    InternalServerError(String),
    NotFoundError(String),
}

impl Display for Error {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::InternalServerError(msg) => write!(f, "Internal Server Error: {}", msg),
            Self::NotFoundError(msg) => write!(f, "Not Found: {}", msg),
        }
    }
}

pub type Result<T> = std::result::Result<T, Error>;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenv().ok();

    let config = InjectorConfig::new();

    let app = Router::new()
        .route("/", get(get_index_html))
        .route("/post/:post_id", get(get_post))
        .fallback(get(get_fallback));

    let addr = config.addr;
    let url = config.url;

    match config.https {
        Enabled => {
            let ssl_cert = config.ssl_crt.as_ref().expect(
                "The environment variable 'injector_ssl_crt' should be set when using HTTPS",
            );
            let ssl_key = config.ssl_key.as_ref().expect(
                "The environment variable 'injector_ssl_key' should be set when using HTTPS",
            );

            let config = RustlsConfig::from_pem_file(ssl_cert, ssl_key)
                .await
                .unwrap();

            println!("listening on {url}");
            axum_server::bind_rustls(addr, config)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }

        Disabled => {
            println!("listening on {url}");
            axum_server::bind(addr)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }
    };
}

async fn get_index_html(req: Request<Body>) -> Response {
    println!("-> GET {}", req.uri());

    match inject_default_meta(req.uri()).await {
        Err(error) => {
            eprintln!("{}", error);

            Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from(error.to_string()))
                .unwrap()
        }

        Ok(body) => Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, "text/html")
            .header("x-generated-by", "rust")
            .body(Body::from(body))
            .unwrap(),
    }
}

async fn get_post(Path(post_id): Path<String>, req: Request<Body>) -> Response {
    let uri = req.uri();
    println!("-> GET {}", uri);

    match PostCtrl::view(&post_id).await {
        Err(error) => error_handler(error),
        Ok(body) => Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, "text/html")
            .header("x-generated-by", "rust")
            .body(Body::from(body))
            .unwrap(),
    }
}

async fn get_fallback(req: Request<Body>) -> Response {
    let uri = req.uri();
    println!("-> GET {}", uri);

    Response::builder()
        .status(StatusCode::NOT_FOUND)
        .body(Body::from("Not Found"))
        .unwrap()
}

fn error_handler(error: Error) -> Response {
    println!("{}", error);

    let status = match error {
        Error::InternalServerError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        Error::NotFoundError(_) => StatusCode::NOT_FOUND,
    };

    Response::builder()
        .status(status)
        .body(Body::from(error.to_string()))
        .unwrap()
}
