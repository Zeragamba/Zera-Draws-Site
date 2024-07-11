use serde::Deserialize;
use url::Url;
use url_serde;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct ImageData {
    pub id: Uuid,
    pub position: u64,
    pub filename: String,
    pub height: u64,
    pub width: u64,
    pub mime_type: String,
    pub ext: String,
    pub srcs: ImageSrcData,
}

#[derive(Deserialize)]
pub struct ImageSrcData {
    #[serde(with = "url_serde")]
    pub full: Url,
    #[serde(with = "url_serde")]
    pub high: Option<Url>,
    #[serde(with = "url_serde")]
    pub low: Option<Url>,
    #[serde(with = "url_serde")]
    pub gallery: Option<Url>,
}
