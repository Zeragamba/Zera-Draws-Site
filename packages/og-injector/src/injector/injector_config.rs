use std::net::SocketAddr;
use std::path::PathBuf;

use crate::config::{Environment, FeatureFlag};
use crate::config::FeatureFlag::{Disabled, Enabled};

pub struct InjectorConfig {
    pub https: FeatureFlag,
    pub ssl_crt: Option<PathBuf>,
    pub ssl_key: Option<PathBuf>,
    pub url: String,
    pub addr: SocketAddr,
}

impl InjectorConfig {
    pub fn new() -> Self {
        let env = Environment::new();

        let host = env.injector_host;
        let port = env.injector_port;

        let https = env.injector_https;
        let url = match https {
            Enabled => format!("https://{host}:{port}"),
            Disabled => format!("http://{host}:{port}"),
        };

        let ssl_crt = env.injector_ssl_crt;
        let ssl_key = env.injector_ssl_key;

        let addr = SocketAddr::new(host, port);

        Self {
            https,
            ssl_crt,
            ssl_key,
            url,
            addr,
        }
    }
}
