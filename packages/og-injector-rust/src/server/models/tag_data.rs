use iso8601::DateTime;
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
#[allow(dead_code)]
pub struct TagData {
    id: Uuid,
    name: String,
    slug: String,
    num_posts: u64,
    #[serde(with = "crate::serde::date_time")]
    created_at: DateTime,
    #[serde(with = "crate::serde::date_time")]
    updated_at: DateTime,
    featured: bool,
}
