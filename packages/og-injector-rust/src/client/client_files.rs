use std::fs::File;
use std::io::Read;

use crate::client::ClientConfig;
use crate::error::{AppError, AppResult};

pub struct ClientFiles;

impl ClientFiles {
    pub async fn read(file: &str) -> AppResult<String> {
        let config = ClientConfig::new();
        let file_path = config.dir.join(file);

        if !file_path.exists() {
            let path = file_path.to_string_lossy();
            return Err(AppError::NotFoundError(path.to_string()));
        }

        let mut contents = String::new();

        let mut file = File::open(file_path)?;
        file.read_to_string(&mut contents)?;

        Ok(contents)
    }

    pub async fn index_html() -> AppResult<String> {
        Self::read("index.html").await
    }

    pub async fn app_manifest() -> AppResult<String> {
        Self::read("manifest.json").await
    }
}
