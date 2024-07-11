use serde::Deserialize;
use url::Url;

use crate::client::{ClientConfig, ClientError, ClientFiles, Result};

#[derive(Deserialize)]
pub struct ClientManifestJson {
    pub name: Option<String>,
    pub description: Option<String>,
    pub start_url: Option<String>,
}

pub struct ClientManifest {
    pub name: Option<String>,
    pub desc: Option<String>,
    pub start_url: Option<Url>,
}

impl ClientManifest {
    pub async fn load() -> Result<ClientManifest> {
        let manifest_file = ClientFiles::app_manifest().await?;

        let manifest: ClientManifestJson =
            serde_json::from_str(&manifest_file).map_err(|e| ClientError { msg: e.to_string() })?;

        Ok(ClientManifest {
            name: manifest.name,
            desc: manifest.description,
            start_url: parse_start_url(&manifest.start_url),
        })
    }
}

fn parse_start_url(start_url: &Option<String>) -> Option<Url> {
    let start_url = match start_url {
        None => return None,
        Some(url) => url,
    };

    // Url might be an absolute URL, attempt to parse
    if let Ok(url) = start_url.parse::<Url>() {
        return Some(url);
    }

    // attempt to join paths, else discard and return None
    ClientConfig::new().url.join(&start_url).ok()
}
