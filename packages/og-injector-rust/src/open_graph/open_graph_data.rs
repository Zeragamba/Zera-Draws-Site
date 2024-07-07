use std::fmt;
use std::fmt::Formatter;

use crate::client::ClientConfig;
use crate::open_graph::OpenGraphImageData;

#[derive(Debug)]
pub struct OpenGraphData {
    pub og_type: Option<String>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub url: Option<String>,
    pub image: Option<OpenGraphImageData>,
}

impl fmt::Display for OpenGraphData {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{:#?}", self)
    }
}

impl OpenGraphData {
    pub fn builder(client_config: &ClientConfig) -> OpenGraphDataBuilder {
        OpenGraphDataBuilder::new(client_config)
    }
}

#[derive(Default)]
pub struct OpenGraphDataBuilder {
    og_type: Option<String>,
    title: Option<String>,
    description: Option<String>,
    url: Option<String>,
    image: Option<OpenGraphImageData>,
}

impl OpenGraphDataBuilder {
    pub fn new(client_config: &ClientConfig) -> OpenGraphDataBuilder {
        OpenGraphDataBuilder {
            og_type: None,
            title: None,
            description: None,
            url: Some(client_config.url.clone()),
            image: None,
        }
    }

    pub fn title(mut self, title: &str) -> OpenGraphDataBuilder {
        self.title = Some(title.to_string());
        self
    }

    pub fn og_type(mut self, og_type: &str) -> OpenGraphDataBuilder {
        self.og_type = Some(og_type.to_string());
        self
    }

    pub fn description(mut self, description: &str) -> OpenGraphDataBuilder {
        self.description = Some(description.to_string());
        self
    }

    pub fn url(mut self, url: &str) -> OpenGraphDataBuilder {
        self.url = Some(url.to_string());
        self
    }

    pub fn image(mut self, image: OpenGraphImageData) -> OpenGraphDataBuilder {
        self.image = Some(image);
        self
    }

    pub fn build(self) -> OpenGraphData {
        OpenGraphData {
            og_type: self.og_type,
            title: self.title,
            description: self.description,
            url: self.url,
            image: self.image,
        }
    }
}
