use std::net::SocketAddr;
use std::path::PathBuf;

use crate::config::{Config, FeatureFlag};
use crate::config::FeatureFlag::{Disabled, Enabled};

pub struct InjectorConfig {
    pub url: String,
    pub https: FeatureFlag,
    pub ssl_crt: Option<PathBuf>,
    pub ssl_key: Option<PathBuf>,
    pub addr: SocketAddr,
}

impl InjectorConfig {
    pub fn new() -> InjectorConfig {
        let host = Config::env_str("INJECTOR_HOST")
            .expect("The environment variable 'INJECTOR_HOST' should be set")
            .parse()
            .expect("The environment variable 'INJECTOR_HOST' should be a valid IP Address");

        let port = Config::env_int("INJECTOR_PORT")
            .expect("The environment variable 'INJECTOR_PORT' should be set")
            .try_into()
            .expect("The environment variable 'INJECTOR_PORT' should be a valid port");

        let https = match Config::env_bool("INJECTOR_HTTPS") {
            Some(true) => Enabled,
            _ => Disabled,
        };

        let url = match https {
            Enabled => format!("https://{host}:{port}"),
            Disabled => format!("http://{host}:{port}"),
        };

        let ssl_crt = Config::env_path("INJECTOR_SSL_CRT");
        let ssl_key = Config::env_path("INJECTOR_SSL_KEY");

        let socket = SocketAddr::new(host, port);

        InjectorConfig {
            https,
            ssl_crt,
            ssl_key,
            url,
            addr: socket,
        }
    }
}
