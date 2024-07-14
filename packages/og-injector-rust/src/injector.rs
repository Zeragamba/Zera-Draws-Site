use axum::http::Uri;

pub use injector_config::InjectorConfig;

use crate::client::{ClientFiles, ClientManifest};
use crate::error::AppResult;
use crate::open_graph::open_graph_data::OpenGraphDataBuilder;
use crate::open_graph::OpenGraphData;
use crate::server::models::PostData;

use self::meta_tags::MetaTags;

mod injector_config;
mod meta_tags;

pub async fn inject_default_meta(uri: &Uri) -> AppResult<String> {
    let meta = OpenGraphDataBuilder::default()
        .url_path(&uri.to_string())
        .build()?;

    return inject_meta(&meta).await;
}

pub async fn inject_post_meta(post: &PostData) -> AppResult<String> {
    let path = format!("/post/{}", post.slug);

    let mut meta = OpenGraphDataBuilder::default();

    meta.manifest(&ClientManifest::load().await?)
        .title(post.title.to_string())
        .url_path(&path);

    if let Some(description) = post.description.as_ref() {
        meta.description(description.to_string());
    }

    if let Some(img) = post.images.first().as_deref() {
        meta.image(img.into());
    }

    return inject_meta(&meta.build()?).await;
}

pub async fn inject_meta(meta: &OpenGraphData) -> AppResult<String> {
    println!("Injecting OG Data: {}", meta);

    let html = ClientFiles::index_html().await?;
    let html = MetaTags::new(meta).inject(html);

    Ok(html)
}
