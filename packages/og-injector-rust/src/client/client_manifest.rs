use url::Url;
use serde::Deserialize;

use crate::client::{ClientError, ClientFiles, Result};

#[derive(Deserialize)]
pub struct ClientManifest {
    pub name: Option<String>,
    pub description: Option<String>,
    #[serde(with = "url_serde")]
    pub start_url: Option<Url>,
}

impl ClientManifest {
    pub async fn load() -> Result<ClientManifest> {
        let manifest_file = ClientFiles::app_manifest().await?;

        let manifest: ClientManifest =
            serde_json::from_str(&manifest_file).map_err(|e| ClientError { msg: e.to_string() })?;

        Ok(manifest)
    }
}
