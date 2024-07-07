use std::fs::File;
use std::io::Read;
use std::path::PathBuf;

use reqwest::Certificate;

use crate::config::Config;
use crate::server::Result;

pub struct ServerConfig {
    pub host: String,
    pub port: i16,
    pub url: String,
    pub https: bool,
    pub cert: Option<PathBuf>,
}

impl ServerConfig {
    pub fn new() -> ServerConfig {
        let host = Config::env_str("SERVER_HOST")
            .expect("The environment variable 'SERVER_HOST' should be set");

        let port = Config::env_str("SERVER_PORT")
            .expect("The environment variable 'SERVER_PORT' should be set")
            .parse()
            .expect("The environment variable 'SERVER_PORT' should be a valid port");

        let https = Config::env_bool("SERVER_HTTPS").unwrap_or(false);

        let protocol = if https { "https" } else { "http" };
        let url = format!("{protocol}://{host}:{port}");

        let cert = Config::env_path("SERVER_SSL_CRT");

        ServerConfig {
            host,
            port,
            https,
            cert,
            url,
        }
    }

    pub async fn load_cert(&self) -> Result<Option<Certificate>> {
        let cert_path = match self.cert.as_ref() {
            None => return Ok(None),
            Some(path) => path,
        };

        let mut file = File::open(cert_path)?;
        let mut contents = vec![];
        file.read_to_end(&mut contents)?;

        let cert = Certificate::from_pem(&contents)?;

        Ok(Some(cert))
    }
}
