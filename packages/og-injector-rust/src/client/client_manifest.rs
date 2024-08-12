use serde::Deserialize;

use crate::client::ClientFiles;
use crate::error::AppResult;

#[derive(Deserialize)]
pub struct ClientManifestJson {
    pub name: Option<String>,
    pub description: Option<String>,
}

pub struct ClientManifest {
    pub name: Option<String>,
    pub desc: Option<String>,
}

impl ClientManifest {
    pub async fn load() -> AppResult<ClientManifest> {
        let manifest_file = ClientFiles::app_manifest().await?;

        let manifest: ClientManifestJson = serde_json::from_str(&manifest_file)?;

        Ok(ClientManifest {
            name: manifest.name,
            desc: manifest.description,
        })
    }
}
