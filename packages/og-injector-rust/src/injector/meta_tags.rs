use url::Url;

use crate::client::ClientManifest;
use crate::open_graph::OpenGraphData;
use crate::open_graph::OpenGraphImageData;

pub struct MetaTags {
    tags: Vec<String>,
}

impl MetaTags {
    pub fn new(manifest: &ClientManifest, meta: &OpenGraphData) -> MetaTags {
        let mut meta_tags = MetaTags { tags: vec![] };

        meta_tags
            .add_type(meta.og_type.as_deref().unwrap_or("website"))
            .add_url(meta.url.as_ref().or(manifest.start_url.as_ref()))
            .add_title(meta.title.as_deref().or(manifest.name.as_deref()))
            .add_description(meta.desc.as_deref().or(manifest.desc.as_deref()))
            .add_image(meta.image.as_ref());

        meta_tags
    }

    pub fn to_string(&self) -> String {
        self.tags.join("")
    }

    pub fn inject(&self, html: String) -> String {
        if !html.contains("</head>") {
            return html;
        };

        let tags = self.to_string();
        let replacement = format!("{}</head>", tags);
        html.replace("</head>", &replacement)
    }

    fn add_meta(&mut self, name: &str, content: &str) -> &mut Self {
        self.add_meta_opt(name, Some(content))
    }

    fn add_meta_opt(&mut self, name: &str, content: Option<&str>) -> &mut Self {
        if let Some(content) = content.map(str::trim) {
            self.tags.push(create_meta_tag(name, content));
        }

        self
    }

    fn add_link_opt(&mut self, rel: &str, href: Option<&str>) -> &mut Self {
        if let Some(href) = href.map(str::trim) {
            self.tags.push(create_link_tag(rel, href));
        }

        self
    }

    fn add_type(&mut self, og_type: &str) -> &mut Self {
        self.add_meta("og:type", og_type)
    }

    fn add_title(&mut self, title: Option<&str>) -> &mut Self {
        self.add_meta_opt("og:title", title)
            .add_meta_opt("twitter:title", title)
    }

    fn add_url(&mut self, url: Option<&Url>) -> &mut Self {
        let url = url.map(|url| url.as_str());
        self.add_meta_opt("og:url", url)
            .add_meta_opt("twitter:url", url)
            .add_link_opt("canonical", url)
    }

    fn add_description(&mut self, description: Option<&str>) -> &mut Self {
        self.add_meta_opt("og:description", description)
            .add_meta_opt("twitter:description", description)
    }

    fn add_image(&mut self, image_meta: Option<&OpenGraphImageData>) -> &mut Self {
        match image_meta {
            Some(image_meta) => self
                .add_meta("twitter:card", "summary_large_image")
                .add_meta("og:image", &image_meta.url)
                .add_meta("og:image:type", &image_meta.mime_type)
                .add_meta("og:image:height", &image_meta.height)
                .add_meta("og:image:width", &image_meta.width)
                .add_meta("twitter:image", &image_meta.url),
            None => self.add_meta("twitter:card", "summary"),
        }
    }
}

fn create_meta_tag(name: &str, content: &str) -> String {
    format!("<meta name=\"{name}\" content=\"{content}\" />")
}

fn create_link_tag(rel: &str, href: &str) -> String {
    format!("<link rel=\"{rel}\" href=\"{href}\" />")
}
