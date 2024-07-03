use std::net::SocketAddr;
use std::path::PathBuf;

use axum::{http::StatusCode, Router, routing::get};
use axum_server::tls_rustls::RustlsConfig;

mod client;
mod ssl;

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    let root_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .expect("Unable to build path to root dir");
    let cert_dir = root_dir.join(".certs");

    println!(
        "Certs dir: {}",
        cert_dir.to_str().expect("Error forming path")
    );

    let ssl_cert = ssl::get_ssl_cert_path();
    let ssl_key = ssl::get_ssl_key_path();
    let config = RustlsConfig::from_pem_file(ssl_cert, ssl_key)
        .await
        .unwrap();

    // build our application with a route
    let app = Router::new().route("/", get(get_index_html));

    // run https server
    let addr = SocketAddr::from(([0, 0, 0, 0], 3002));
    println!("listening on {}", addr);
    axum_server::bind_rustls(addr, config)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn get_index_html() -> (StatusCode, String) {
    return match client::fetch_index_html().await {
        Ok(index_html) => (StatusCode::OK, index_html),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()),
    };
}
