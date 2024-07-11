use crate::Error::InternalServerError;
use crate::injector::inject_post_meta;
use crate::server::ServerApi;
use crate::server::ServerConfig;

use super::Result;

pub struct PostCtrl;

impl PostCtrl {
    pub async fn view(post_id: &str) -> Result<String> {
        let server_api = ServerApi::new(ServerConfig::new())
            .await
            .map_err(|e| InternalServerError(e.to_string()))?;

        let post_data = server_api
            .get_post(&post_id)
            .await
            .map_err(|e| InternalServerError(e.to_string()))?;

        inject_post_meta(&post_data)
            .await
            .map_err(|e| InternalServerError(e.to_string()))
    }
}
