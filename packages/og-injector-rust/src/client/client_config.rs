use std::path::PathBuf;
use url::Url;
use crate::config::Environment;

pub struct ClientConfig {
    pub title: String,
    pub url: Url,
    pub dir: PathBuf,
}

impl ClientConfig {
    pub fn new() -> Self {
        let env = Environment::new();

        Self {
            title: env.app_name,
            url: env.app_url,
            dir: env.client_dir,
        }
    }
}
