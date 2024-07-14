use iso8601::DateTime;
use serde::Deserialize;
use uuid::Uuid;

use crate::error::AppResult;
use crate::server_api::{ServerApi, ServerConfig};
use crate::server_api::models::PostData;

#[derive(Deserialize)]
pub struct TagData {
    pub id: Uuid,

    pub name: String,

    pub slug: String,

    pub num_posts: u64,

    #[serde(with = "crate::serde::date_time")]
    pub created_at: DateTime,

    #[serde(with = "crate::serde::date_time")]
    pub updated_at: DateTime,

    pub featured: bool,
}

impl TagData {
    pub async fn posts(&self) -> AppResult<Vec<PostData>> {
        let config = ServerConfig::new();
        let server_api = ServerApi::new(config).await?;
        server_api.get_tagged_posts(&self.slug).await
    }
}
