use ::serde::Deserialize;

use super::image_data::ImageData;

#[derive(Deserialize)]
pub struct PostData {
    pub title: String,
    pub slug: String,
    pub description: Option<String>,
    pub images: Vec<ImageData>,
}
