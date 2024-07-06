use std::env;
use std::env::VarError;
use std::net::SocketAddr;

use axum::{http::StatusCode, Router, routing::get};
use axum::body::Body;
use axum::http::Request;
use axum::response::Response;
use axum_server::tls_rustls::RustlsConfig;
use reqwest::header;

mod client;
mod ssl;

fn is_https_enabled() -> bool {
    match env::var("HTTPS_ENABLED") {
        Ok(value) => value == "true",
        Err(err) => {
            match err {
                VarError::NotPresent => true,
                VarError::NotUnicode(_) => panic!("HTTPS_ENABLED was not a unicode value"),
            }
        }
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        .route("/", get(get_index_html))
        .fallback(get(get_fallback));

    // run https server
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("listening on {}", addr);

    if is_https_enabled() {
        let ssl_cert = ssl::get_ssl_cert_path()
            .expect("Unable to read SSL Cert");
        let ssl_key = ssl::get_ssl_key_path()
            .expect("Unable to read SSL Key");
        let config = RustlsConfig::from_pem_file(ssl_cert, ssl_key)
            .await
            .unwrap();
        axum_server::bind_rustls(addr, config)
            .serve(app.into_make_service())
            .await
            .unwrap();
    } else {
        axum_server::bind(addr)
            .serve(app.into_make_service())
            .await
            .unwrap();
    };
}

async fn get_index_html(req: Request<Body>) -> Response {
    println!("-> GET {}", req.uri());

    return match client::fetch_index_html().await {
        Err(error) => {
            Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from(error.to_string()))
                .unwrap()
        }

        Ok(index_html) => {
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "text/html")
                .header("x-generated-by", "rust")
                .body(Body::from(index_html))
                .unwrap()
        }
    };
}

async fn get_fallback(req: Request<Body>) -> Response {
    println!("-> GET {}", req.uri());

    Response::builder()
        .status(StatusCode::INTERNAL_SERVER_ERROR)
        .body(Body::from("Unexpected request"))
        .unwrap()
}
