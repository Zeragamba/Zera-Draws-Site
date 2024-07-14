extern crate derive_builder;

use axum_server::tls_rustls::RustlsConfig;
use dotenv::dotenv;

use crate::config::Environment;
use crate::config::FeatureFlag::{Disabled, Enabled};
use crate::injector::InjectorConfig;
use crate::injector::router::build_router;

mod client;
mod config;
mod error;
mod injector;
mod open_graph;
mod serde;
mod server_api;

#[tokio::main]
async fn main() {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    Environment::check();

    let config = InjectorConfig::new();

    let app = build_router().into_make_service();
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
            let server = axum_server::bind_rustls(addr, config);
            server.serve(app).await.unwrap();
        }

        Disabled => {
            println!("listening on {url}");
            let server = axum_server::bind(addr);
            server.serve(app).await.unwrap();
        }
    };
}
