use crate::open_graph::OpenGraphData;

pub struct MetaTags {
    tags: Vec<String>,
}

impl MetaTags {
    pub fn new(meta: &OpenGraphData) -> MetaTags {
        let mut meta_tags = MetaTags { tags: vec![] };

        meta_tags.add_meta("og:type", &meta.og_type);

        meta_tags
            .add_meta("og:url", meta.url.as_str())
            .add_meta("twitter:url", meta.url.as_str())
            .add_link("canonical", meta.url.as_str());

        meta_tags
            .add_meta("og:title", &meta.title)
            .add_meta("twitter:title", &meta.title);

        match meta.description.as_deref() {
            Some(description) => {
                meta_tags
                    .add_meta("og:description", description)
                    .add_meta("twitter:description", description);
            }
            _ => {}
        };

        match meta.image.as_ref() {
            None => {
                meta_tags.add_meta("twitter:card", "summary");
            }
            Some(image) => {
                meta_tags
                    .add_meta("twitter:card", "summary_large_image")
                    .add_meta("og:image", &image.url)
                    .add_meta("og:image:type", &image.mime_type)
                    .add_meta("og:image:height", &image.height)
                    .add_meta("og:image:width", &image.width)
                    .add_meta("twitter:image", &image.url);
            }
        };

        meta_tags
    }

    pub fn inject(&self, html: String) -> String {
        if !html.contains("</head>") {
            return html;
        };

        let tags = self.tags.join("\n  ");
        let replacement = format!("  {tags}\n</head>");
        html.replace("</head>", &replacement)
    }

    fn add_meta(&mut self, name: &str, content: &str) -> &mut Self {
        self.tags.push(create_meta_tag(name, content));
        self
    }

    fn add_link(&mut self, rel: &str, href: &str) -> &mut Self {
        self.tags.push(create_link_tag(rel, href));
        self
    }
}

fn create_meta_tag(name: &str, content: &str) -> String {
    format!("<meta name=\"{name}\" content=\"{content}\" />")
}

fn create_link_tag(rel: &str, href: &str) -> String {
    format!("<link rel=\"{rel}\" href=\"{href}\" />")
}
