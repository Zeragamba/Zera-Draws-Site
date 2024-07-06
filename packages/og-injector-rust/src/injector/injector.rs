use crate::client::{ClientFiles, ClientManifest};
use crate::injector::InjectorError;
use crate::injector::InjectorError::{HeadNotFoundError, IndexReadError, ManifestReadError};
use crate::open_graph::OpenGraphData;

pub type Result<T> = std::result::Result<T, InjectorError>;

pub async fn inject_meta(meta: &OpenGraphData) -> Result<String> {
    println!("Injecting OG Data: {}", meta);

    let html = ClientFiles::index_html()
        .await
        .map_err(|e| IndexReadError { msg: e.to_string() })?;

    if !html.contains("</head>") {
        return Err(HeadNotFoundError);
    };

    let app_manifest = ClientManifest::load()
        .await
        .map_err(|e| ManifestReadError { msg: e.to_string() })?;

    let mut meta_tags = MetaTags::new();
    meta_tags.add("og:type", meta.og_type.as_deref().unwrap_or("website"));

    let title = meta
        .title
        .as_deref()
        .or(app_manifest.name.as_deref())
        .map(str::trim);
    meta_tags.add_optional("og:title", title);
    meta_tags.add_optional("twitter:title", title);

    let url = meta
        .url
        .as_deref()
        .or(app_manifest.start_url.as_deref())
        .map(str::trim);
    meta_tags.add_optional("og:url", url);
    meta_tags.add_optional("twitter:url", url);

    let description = meta
        .description
        .as_deref()
        .or(app_manifest.description.as_deref())
        .map(str::trim);
    meta_tags.add_optional("og:description", description);
    meta_tags.add_optional("twitter:description", description);

    match &meta.image {
        Some(image_meta) => {
            meta_tags.add("twitter:card", "summary_large_image");
            meta_tags.add("og:image", &image_meta.url);
            meta_tags.add("og:image:type", &image_meta.mime_type);
            meta_tags.add("og:image:height", &image_meta.height);
            meta_tags.add("og:image:width", &image_meta.width);
            meta_tags.add("twitter:image", &image_meta.url);
        }
        None => meta_tags.add("twitter:card", "summary"),
    };

    let replacement = format!("{}</head>", meta_tags.to_string());
    let html = html.replace("</head>", &replacement);

    Ok(html)
}

struct MetaTags {
    tags: Vec<String>,
}

impl MetaTags {
    fn new() -> MetaTags {
        MetaTags { tags: vec![] }
    }

    fn create_meta_tag(&self, name: &str, content: &str) -> String {
        format!("<meta name=\"{name}\" content=\"{content}\" />")
    }

    fn add_optional(&mut self, name: &str, content: Option<&str>) {
        if content.is_some() {
            let tag = self.create_meta_tag(name, content.unwrap());
            self.tags.push(tag);
        }
    }

    fn add(&mut self, name: &str, content: &str) {
        self.add_optional(name, Some(content))
    }

    fn to_string(&self) -> String {
        self.tags.join("")
    }
}
