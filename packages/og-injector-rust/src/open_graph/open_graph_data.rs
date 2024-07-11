use std::fmt;
use std::fmt::Formatter;

use url::Url;

use super::OpenGraphImageData;

#[derive(Debug, Clone)]
pub struct OpenGraphData {
    pub og_type: Option<String>,
    pub title: Option<String>,
    pub desc: Option<String>,
    pub url: Option<Url>,
    pub image: Option<OpenGraphImageData>,
}

impl fmt::Display for OpenGraphData {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{:#?}", self)
    }
}

impl OpenGraphData {
    pub fn new() -> OpenGraphData {
        OpenGraphData {
            og_type: None,
            title: None,
            desc: None,
            url: None,
            image: None,
        }
    }

    pub fn title(&mut self, title: &str) -> &mut OpenGraphData {
        self.title = Some(title.to_string());
        self
    }

    pub fn og_type(&mut self, og_type: &str) -> &mut OpenGraphData {
        self.og_type = Some(og_type.to_string());
        self
    }

    pub fn description(&mut self, description: Option<&str>) -> &mut OpenGraphData {
        self.desc = description.map(|v| v.to_string());
        self
    }

    pub fn url(&mut self, url: Option<Url>) -> &mut OpenGraphData {
        self.url = url;
        self
    }

    pub fn url_path(&mut self, path: &str) -> &mut OpenGraphData {
        match self.url.as_ref() {
            None => self,
            Some(url) => {
                let mut url = url.clone();
                url.set_path(path);
                self.url(Some(url))
            }
        }
    }

    pub fn image(&mut self, image: Option<OpenGraphImageData>) -> &mut OpenGraphData {
        self.image = image;
        self
    }
}
