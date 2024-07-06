use axum::{http::StatusCode, Router, routing::get};
use axum::body::Body;
use axum::http::Request;
use axum::response::Response;
use axum_server::tls_rustls::RustlsConfig;
use dotenv::dotenv;

use crate::config::FeatureFlag::{Disabled, Enabled};

mod client;
mod config;
mod injector_ctrl;

#[tokio::main]
async fn main() {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .merge(injector_ctrl::router())
        .fallback(get(get_fallback));

    let addr = config::get_app_socket();

    match config::is_https_enabled() {
        Enabled => {
            let ssl_cert = config::get_ssl_cert_path();
            let ssl_key = config::get_ssl_key_path();

            let config = RustlsConfig::from_pem_file(ssl_cert, ssl_key)
                .await
                .unwrap();

            println!("listening on https://{}", addr);
            axum_server::bind_rustls(addr, config)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }

        Disabled => {
            println!("listening on http://{}", addr);
            axum_server::bind(addr)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }
    };
}

async fn get_fallback(req: Request<Body>) -> Response {
    let uri = req.uri();
    println!("-> GET {}", uri);

    Response::builder()
        .status(StatusCode::NOT_FOUND)
        .body(Body::from("Not Found"))
        .unwrap()
}
