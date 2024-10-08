use std::fs::File;
use std::io::Read;
use std::path::PathBuf;

use reqwest::Certificate;
use url::Url;

use crate::config::{Environment, FeatureFlag};
use crate::config::FeatureFlag::{Disabled, Enabled};
use crate::error::AppResult;

pub struct ServerConfig {
    pub url: Url,
    pub https: FeatureFlag,
    pub ssl_crt: Option<PathBuf>,
}

impl ServerConfig {
    pub fn new() -> Self {
        let env = Environment::new();
        let is_https = env.server_url.scheme() == "https";

        Self {
            url: env.server_url,
            https: match is_https {
                true => Enabled,
                false => Disabled,
            },
            ssl_crt: env.server_ssl_crt,
        }
    }

    pub async fn load_cert(&self) -> AppResult<Option<Certificate>> {
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
