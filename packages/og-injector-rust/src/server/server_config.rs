use std::fs::File;
use std::io::Read;
use std::path::PathBuf;

use reqwest::Certificate;

use crate::config::{Environment, FeatureFlag};
use crate::config::FeatureFlag::{Disabled, Enabled};

pub struct ServerConfig {
    pub url: String,
    pub https: FeatureFlag,
    pub ssl_crt: Option<PathBuf>,
}

impl ServerConfig {
    pub fn new() -> Self {
        let env = Environment::new();
        let url = env.server_url.starts_with("https://");

        Self {
            url: env.server_url,
            https: match url {
                true => Enabled,
                false => Disabled,
            },
            ssl_crt: env.server_ssl_crt,
        }
    }

    pub async fn load_cert(&self) -> crate::server::Result<Option<Certificate>> {
        let cert_path = match self.ssl_crt.as_ref() {
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
