extern crate derive_builder;

use axum::{http::StatusCode, Router, routing::get};
use axum::body::Body;
use axum::extract::Path;
use axum::http::{header, Request};
use axum::response::Response;
use axum_server::tls_rustls::RustlsConfig;
use dotenv::dotenv;

use post_controller::PostCtrl;

use crate::client::ClientFiles;
use crate::config::Environment;
use crate::config::FeatureFlag::{Disabled, Enabled};
use crate::injector::{inject_default_meta, InjectorConfig};

mod client;
mod config;
mod error;
mod injector;
mod open_graph;
mod post_controller;
mod serde;
mod server;

#[tokio::main]
async fn main() {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    Environment::check();

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
        Err(error) => error.as_response(),
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
        Err(error) => error.as_response(),
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
    println!("-> GET FALLBACK: {}", uri);

    let file_path = uri.path().strip_prefix('/').unwrap_or("");

    match ClientFiles::read(file_path).await {
        Err(error) => error.as_response(),
        Ok(body) => Response::builder()
            .status(StatusCode::OK)
            .header("x-generated-by", "rust")
            .body(Body::from(body))
            .unwrap(),
    }
}
