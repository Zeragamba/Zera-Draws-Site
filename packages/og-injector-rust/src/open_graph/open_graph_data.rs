use std::fmt;
use std::fmt::Formatter;

use url::Url;

use crate::client::ClientConfig;
use crate::open_graph::OpenGraphImageData;

#[derive(Debug)]
pub struct OpenGraphData {
    pub og_type: Option<String>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub url: Option<Url>,
    pub canonical_url: Option<Url>,
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

pub struct OpenGraphDataBuilder {
    data: OpenGraphData,
}

impl OpenGraphDataBuilder {
    pub fn new(client_config: &ClientConfig) -> OpenGraphDataBuilder {
        OpenGraphDataBuilder {
            data: OpenGraphData {
                og_type: None,
                title: None,
                description: None,
                url: Some(client_config.url.clone()),
                canonical_url: None,
                image: None,
            },
        }
    }

    pub fn title(mut self, title: &str) -> OpenGraphDataBuilder {
        self.data.title = Some(title.to_string());
        self
    }

    pub fn og_type(mut self, og_type: &str) -> OpenGraphDataBuilder {
        self.data.og_type = Some(og_type.to_string());
        self
    }

    pub fn description(mut self, description: &str) -> OpenGraphDataBuilder {
        self.data.description = Some(description.to_string());
        self
    }

    pub fn url(mut self, url: Url) -> OpenGraphDataBuilder {
        self.data.url = Some(url);
        self
    }

    pub fn canonical_url(mut self, url: Url) -> OpenGraphDataBuilder {
        self.data.canonical_url = Some(url);
        self
    }

    pub fn image(mut self, image: OpenGraphImageData) -> OpenGraphDataBuilder {
        self.data.image = Some(image);
        self
    }

    pub fn build(self) -> OpenGraphData {
        self.data
    }
}
