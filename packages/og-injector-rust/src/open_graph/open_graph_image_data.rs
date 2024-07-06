use std::fmt;
use std::fmt::Formatter;

#[derive(Default, Debug)]
pub struct OpenGraphImageData {
    pub url: String,
    pub mime_type: String,
    pub height: String,
    pub width: String,
}

impl fmt::Display for OpenGraphImageData {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self)
    }
}
