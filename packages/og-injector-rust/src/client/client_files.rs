use std::fs::File;
use std::io::Read;

use crate::client::ClientConfig;
use crate::client::ClientError;
use crate::client::Result;

pub struct ClientFiles;

impl ClientFiles {
    async fn read(file: &str) -> Result<String> {
        let config = ClientConfig::new();
        let index_file = config.dir.join(file);

        File::open(index_file)
            .and_then(|mut file| {
                let mut contents = String::new();
                file.read_to_string(&mut contents)?;
                Ok(contents)
            })
            .map_err(|e| ClientError { msg: e.to_string() })
    }

    pub async fn index_html() -> Result<String> {
        Self::read("index.html").await
    }

    pub async fn app_manifest() -> Result<String> {
        Self::read("manifest.json").await
    }
}
