use std::path::PathBuf;

use crate::config::Config;

pub struct ClientConfig {
    pub url: String,
    pub dir: PathBuf,
}

impl ClientConfig {
    pub fn new() -> ClientConfig {
        let host = Config::env_str("CLIENT_HOST")
            .expect("The environment variable 'CLIENT_HOST' should be set");

        let port = Config::env_int("CLIENT_PORT")
            .expect("The environment variable 'CLIENT_PORT' should be set");

        let https = Config::env_bool("CLIENT_HTTPS").unwrap_or(false);

        let protocol = if https { "https" } else { "http" };
        let url = format!("{protocol}://{host}:{port}");

        let dir = Config::env_path("CLIENT_DIR")
            .expect("The environment variable 'CLIENT_DIR' should be set");

        ClientConfig { url, dir }
    }
}
