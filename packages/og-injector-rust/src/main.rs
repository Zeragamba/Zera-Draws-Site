use axum::{http::StatusCode, Router, routing::get};
use axum::body::Body;
use axum::http::{header, Request};
use axum::response::Response;
use axum_server::tls_rustls::RustlsConfig;
use dotenv::dotenv;

use injector::inject_meta;
use open_graph::OpenGraphData;

use crate::client::ClientConfig;
use crate::config::FeatureFlag::{Disabled, Enabled};
use crate::injector::InjectorConfig;

mod client;
mod config;
mod injector;
mod open_graph;
mod server;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenv().ok();

    let config = InjectorConfig::new();

    let app = Router::new()
        .route("/", get(get_index_html))
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

    let client_config = ClientConfig::new();
    let meta_data = OpenGraphData::builder(&client_config).build();

    match inject_meta(&meta_data).await {
        Err(error) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::from(error.to_string()))
            .unwrap(),

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
