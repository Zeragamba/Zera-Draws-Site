use crate::error::AppResult;
use crate::injector::inject_post_meta;
use crate::server::ServerApi;
use crate::server::ServerConfig;

pub struct PostCtrl;

impl PostCtrl {
    pub async fn view(post_id: &str) -> AppResult<String> {
        let server_api = ServerApi::new(ServerConfig::new()).await?;
        let post_data = server_api.get_post(&post_id).await?;
        inject_post_meta(&post_data).await
    }
}
