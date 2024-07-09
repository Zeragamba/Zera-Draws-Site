use reqwest::{Client, ClientBuilder};

use crate::config::FeatureFlag::Enabled;
use crate::server::Result;
use crate::server::ServerConfig;

struct ServerApi {
    config: ServerConfig,
    client: Client,
}

impl ServerApi {
    pub async fn new(config: ServerConfig) -> Result<ServerApi> {
        let mut client = ClientBuilder::new();

        if matches!(config.https, Enabled) && config.ssl_crt.is_some() {
            let cert = config.load_cert().await?;
            if cert.is_some() {
                client = client.add_root_certificate(cert.unwrap());
            }
        }

        let client = client.build()?;

        Ok(ServerApi { config, client })
    }
}
