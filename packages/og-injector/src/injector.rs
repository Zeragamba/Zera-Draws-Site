use axum::http::Uri;
use axum::routing::IntoMakeService;
use axum::Router;
pub use injector_config::InjectorConfig;

use crate::client::{ClientFiles, ClientManifest};
use crate::error::AppResult;
use crate::injector::router::build_router;
use crate::open_graph::open_graph_data::OpenGraphDataBuilder;
use crate::open_graph::OpenGraphData;
use crate::server_api::models::{PostData, TagData};

use self::meta_tags::MetaTags;

mod injector_config;
mod meta_tags;
pub mod router;
mod router_response;

pub struct Injector {}

impl Injector {
    pub fn build_service() -> IntoMakeService<Router> {
        build_router().into_make_service()
    }
}

pub async fn inject_default_meta(uri: &Uri) -> AppResult<String> {
    let meta = OpenGraphDataBuilder::default()
        .url_path(uri.to_string())
        .build()?;

    inject_meta(&meta).await
}

pub async fn inject_post_meta(post: &PostData) -> AppResult<String> {
    let mut meta = OpenGraphDataBuilder::default();

    meta.manifest(&ClientManifest::load().await?)
        .title(post.title.to_string())
        .url_path(format!("/post/{}", post.slug));

    if let Some(description) = post.description.as_ref() {
        meta.description(description.to_string());
    }

    if let Some(img) = post.images.first().as_deref() {
        meta.image(img.into());
    }

    inject_meta(&meta.build()?).await
}

pub async fn inject_tag_meta(tag: &TagData) -> AppResult<String> {
    let mut meta = OpenGraphDataBuilder::default();

    meta.manifest(&ClientManifest::load().await?)
        .title(tag.name.to_string())
        .description(format!("Posts tagged {}", tag.name))
        .url_path(format!("/tag/{}", tag.slug));

    let posts = tag.posts().await?;
    if let Some(post) = posts.first().as_deref() {
        if let Some(img) = post.images.first().as_deref() {
            meta.image(img.into());
        }
    }

    inject_meta(&meta.build()?).await
}

pub async fn inject_meta(meta: &OpenGraphData) -> AppResult<String> {
    let html = ClientFiles::index_html().await?;
    let html = MetaTags::new(meta).inject(html);
    Ok(html)
}
