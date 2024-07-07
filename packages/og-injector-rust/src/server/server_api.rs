use reqwest::{Client, ClientBuilder};

use crate::server::{Result, ServerConfig};

struct ServerApi {
    config: ServerConfig,
    client: Client,
}

impl ServerApi {
    pub async fn new(config: ServerConfig) -> Result<ServerApi> {
        let mut client = ClientBuilder::new();

        if config.https && config.cert.is_some() {
            let cert = config.load_cert().await?;
            if cert.is_some() {
                client = client.add_root_certificate(cert.unwrap());
            }
        }

        let client = client.build()?;

        Ok(ServerApi { config, client })
    }
}
