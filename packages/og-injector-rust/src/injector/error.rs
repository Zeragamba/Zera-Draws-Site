use std::fmt;
use std::fmt::Formatter;

pub enum Error {
    HeadNotFoundError,
    IndexReadError(String),
    ManifestReadError(String),
    ServerApiError(String),
    RenderError(String),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Self::HeadNotFoundError => write!(f, "html head tag not found"),
            Self::IndexReadError(e) => write!(f, "Error reading index: {}", e),
            Self::ManifestReadError(e) => write!(f, "Error reading manifest: {}", e),
            Self::ServerApiError(e) => write!(f, "Error connecting to server: {}", e),
            Self::RenderError(e) => write!(f, "Error rendering: {}", e),
        }
    }
}
