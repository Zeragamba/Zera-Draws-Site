use std::fmt;
use std::fmt::Formatter;

use derive_builder::Builder;
use url::Url;

use crate::client::{ClientConfig, ClientManifest};

use super::OpenGraphImageData;

#[derive(Debug, Clone, Builder)]
pub struct OpenGraphData {
    #[builder(default = "self.default_og_type()")]
    pub og_type: String,

    #[builder(default = "self.default_title()")]
    pub title: String,

    #[builder(setter(strip_option), default)]
    pub description: Option<String>,

    #[builder(default = "self.default_url()")]
    pub url: Url,

    #[builder(setter(strip_option), default)]
    pub image: Option<OpenGraphImageData>,
}

impl fmt::Display for OpenGraphData {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{:#?}", self)
    }
}

impl OpenGraphDataBuilder {
    pub fn manifest(&mut self, manifest: &ClientManifest) -> &mut OpenGraphDataBuilder {
        if let Some(title) = manifest.name.as_ref() {
            self.title(title.to_string());
        }

        if let Some(description) = manifest.desc.as_ref() {
            self.description(description.to_string());
        }

        self
    }

    fn default_og_type(&self) -> String {
        "website".to_string()
    }

    fn default_title(&self) -> String {
        ClientConfig::new().title
    }

    fn default_url(&self) -> Url {
        ClientConfig::new().url
    }

    pub fn url_path(&mut self, path: String) -> &mut OpenGraphDataBuilder {
        if self.url.is_none() {
            let default_url = self.default_url();
            self.url(default_url);
        }

        if let Some(url) = &self.url {
            let mut url = url.clone();
            url.set_path(path.as_str());
            self.url(url);
        }

        self
    }
}
