use std::fmt;
use std::fmt::Formatter;

pub enum InjectorError {
    HeadNotFoundError,
    IndexReadError(String),
    ManifestReadError(String),
}

impl fmt::Display for InjectorError {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Self::HeadNotFoundError => write!(f, "html head tag not found"),
            Self::IndexReadError(e) => write!(f, "Error reading index: {}", e),
            Self::ManifestReadError(e) =>  write!(f, "Error reading manifest: {}", e),
        }
    }
}
