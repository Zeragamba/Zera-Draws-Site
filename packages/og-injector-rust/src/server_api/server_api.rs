use reqwest::{Client, ClientBuilder};
use url::Url;

use crate::config::FeatureFlag::Enabled;
use crate::error::AppResult;
use crate::server_api::models::PostData;
use crate::server_api::models::TagData;
use crate::server_api::responses::{GetPostRes, GetTaggedPostsRes, GetTagRes};

use super::ServerConfig;

pub struct ServerApi {
    api_url: Url,
    client: Client,
}

impl ServerApi {
    pub async fn new(config: ServerConfig) -> AppResult<ServerApi> {
        let mut client = ClientBuilder::new();

        if matches!(config.https, Enabled) && config.ssl_crt.is_some() {
            let cert = config.load_cert().await?;
            if cert.is_some() {
                client = client.add_root_certificate(cert.unwrap());
            }
        }

        let client = client.build()?;
        let api_url = config.url.to_owned();
        Ok(ServerApi { client, api_url })
    }

    fn build_url(&self, path: &str) -> String {
        let mut url = self.api_url.clone();
        url.set_path(path);
        url.to_string()
    }

    pub async fn get_post(&self, post_id: &str) -> AppResult<PostData> {
        let path = format!("/post/{post_id}");
        let url = self.build_url(&path);

        let res = self.client.get(url).send().await?;
        let body = res.text().await?;

        let res: GetPostRes = serde_json::from_str(&body)?;
        Ok(res.post)
    }

    pub async fn get_latest(&self) -> AppResult<PostData> {
        let url = self.build_url("/post/latest");

        let res = self.client.get(url).send().await?;
        let body = res.text().await?;

        let res: GetPostRes = serde_json::from_str(&body)?;
        Ok(res.post)
    }

    pub async fn get_tag(&self, tag_id: &str) -> AppResult<TagData> {
        let path = format!("/tag/{tag_id}");
        let url = self.build_url(&path);

        let res = self.client.get(url).send().await?;
        let body = res.text().await?;

        let res: GetTagRes = serde_json::from_str(&body)?;
        Ok(res.tag)
    }

    pub async fn get_tagged_posts(&self, tag_id: &str) -> AppResult<Vec<PostData>> {
        let path = format!("/tag/{tag_id}/posts");
        let url = self.build_url(&path);

        let res = self.client.get(url).send().await?;
        let body = res.text().await?;

        let res: GetTaggedPostsRes = serde_json::from_str(&body)?;
        Ok(res.posts)
    }
}
