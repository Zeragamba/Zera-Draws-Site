use std::fmt;

#[derive(Debug, Clone)]
pub struct ClientError {
    pub(crate) msg: String,
}

impl fmt::Display for ClientError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.msg)
    }
}