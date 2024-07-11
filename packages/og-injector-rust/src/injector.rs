use axum::http::Uri;

pub use injector_config::InjectorConfig;

use crate::client::{ClientConfig, ClientFiles, ClientManifest};
use crate::open_graph::{OpenGraphData, OpenGraphImageData};
use crate::server::models::PostData;

use self::error::Error;
use self::error::Error::*;
use self::meta_tags::MetaTags;

mod error;
mod injector_config;
mod meta_tags;

pub type Result<T> = std::result::Result<T, Error>;

fn build_meta() -> OpenGraphData {
    let client_url = ClientConfig::new().url;

    let mut meta = OpenGraphData::new();
    meta.url(Some(client_url));

    meta
}

pub async fn inject_default_meta(uri: &Uri) -> Result<String> {
    let mut meta = build_meta();

    meta.url_path(&uri.to_string());

    return inject_meta(&meta).await;
}

pub async fn inject_post_meta(post: &PostData) -> Result<String> {
    let path = format!("/post/{}", post.slug);

    let image = post.images.first().as_deref().map(|img| {
        let url = img.srcs.low.as_ref().unwrap_or_else(|| &img.srcs.full);

        OpenGraphImageData {
            url: url.to_string(),
            mime_type: img.mime_type.clone(),
            height: img.height.to_string(),
            width: img.width.to_string(),
        }
    });

    let mut meta = build_meta();

    meta.title(&post.title)
        .description(post.description.as_deref())
        .image(image)
        .url_path(&path);

    return inject_meta(&meta).await;
}

pub async fn inject_meta(meta: &OpenGraphData) -> Result<String> {
    println!("Injecting OG Data: {}", meta);

    let html = ClientFiles::index_html()
        .await
        .map_err(|e| IndexReadError(e.to_string()))?;

    let app_manifest = ClientManifest::load()
        .await
        .map_err(|e| ManifestReadError(e.to_string()))?;

    let html = MetaTags::new(&app_manifest, meta).inject(html);

    Ok(html)
}
