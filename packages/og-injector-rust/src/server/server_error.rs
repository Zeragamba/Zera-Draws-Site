use std::fmt::{Display, Error as FmtError, Formatter};

pub enum ServerError {
    IoError(std::io::Error),
    ReqwestError(reqwest::Error),
}

impl From<std::io::Error> for ServerError {
    fn from(e: std::io::Error) -> Self {
        Self::IoError(e)
    }
}

impl From<reqwest::Error> for ServerError {
    fn from(e: reqwest::Error) -> Self {
        Self::ReqwestError(e)
    }
}

impl Display for ServerError {
    fn fmt(&self, f: &mut Formatter) -> Result<(), FmtError> {
        match self {
            Self::IoError(e) => write!(f, "File read error: {}", e),
            Self::ReqwestError(e) => write!(f, "reqwest error: {}", e),
        }
    }
}
