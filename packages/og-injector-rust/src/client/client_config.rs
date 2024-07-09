use std::path::PathBuf;
use url::Url;
use crate::config::Environment;

pub struct ClientConfig {
    pub url: Url,
    pub dir: PathBuf,
}

impl ClientConfig {
    pub fn new() -> Self {
        let env = Environment::new();

        Self {
            url: env.client_url,
            dir: env.client_dir,
        }
    }
}
