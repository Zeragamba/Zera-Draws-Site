use serde::Deserialize;

use crate::error::AppResult;
use crate::server_api::{ServerApi, ServerConfig};
use crate::server_api::models::PostData;

#[derive(Deserialize)]
pub struct TagData {
    pub name: String,
    pub slug: String,
}

impl TagData {
    pub async fn posts(&self) -> AppResult<Vec<PostData>> {
        let config = ServerConfig::new();
        let server_api = ServerApi::new(config).await?;
        server_api.get_tagged_posts(&self.slug).await
    }
}
