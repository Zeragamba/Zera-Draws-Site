use std::fmt;
use std::fmt::Formatter;

use crate::server_api::models::ImageData;

#[derive(Default, Debug, Clone)]
pub struct OpenGraphImageData {
    pub url: String,
    pub mime_type: String,
    pub height: String,
    pub width: String,
}

impl fmt::Display for OpenGraphImageData {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self)
    }
}

impl From<&ImageData> for OpenGraphImageData {
    fn from(img: &ImageData) -> OpenGraphImageData {
        let url = img.srcs.low.as_ref().unwrap_or_else(|| &img.srcs.full);

        OpenGraphImageData {
            url: url.to_string(),
            mime_type: img.mime_type.clone(),
            height: img.height.to_string(),
            width: img.width.to_string(),
        }
    }
}
