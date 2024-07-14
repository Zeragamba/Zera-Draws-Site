use serde::Deserialize;

use crate::server_api::models::post_data::PostData;

#[derive(Deserialize)]
pub struct GetPostRes {
    pub post: PostData,
}
