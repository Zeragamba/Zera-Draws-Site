use std::fmt;
use std::fmt::Formatter;

pub use open_graph_data::OpenGraphData;
pub use open_graph_image_data::OpenGraphImageData;

pub mod open_graph_data;
pub mod open_graph_image_data;

pub enum Error {
    UrlParseError(String),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Self::UrlParseError(e) => write!(f, "{}", e),
        }
    }
}

pub type Result<T> = std::result::Result<T, Error>;
