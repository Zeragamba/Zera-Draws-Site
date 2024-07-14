use serde::Deserialize;
use url::Url;
use url_serde;

#[derive(Deserialize)]
pub struct ImageData {
    pub height: u64,
    pub width: u64,
    pub mime_type: String,
    pub srcs: ImageSrcData,
}

#[derive(Deserialize)]
#[allow(dead_code)]
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
