use serde::Deserialize;

use crate::server_api::models::{PostData, TagData};

#[derive(Deserialize)]
pub struct GetPostRes {
    pub post: PostData,
}

#[derive(Deserialize)]
pub struct GetTagRes {
    pub tag: TagData,
}

#[derive(Deserialize)]
pub struct GetTaggedPostsRes {
    pub posts: Vec<PostData>,
}
