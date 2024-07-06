use std::fmt;
use std::fmt::Formatter;

pub enum InjectorError {
    HeadNotFoundError,
    IndexReadError {
        msg: String
    },
    ManifestReadError {
        msg: String
    },
}

impl fmt::Display for InjectorError {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self)
    }
}
