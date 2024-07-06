use std::fmt;
use std::fmt::Debug;
use std::fs::File;
use std::io::Read;

use crate::config;

#[derive(Debug, Clone)]
pub struct ClientError {
    msg: String,
}

impl fmt::Display for ClientError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.msg)
    }
}

pub async fn fetch_index_html() -> Result<String, ClientError> {
    let index_file = config::client_dir().join("index.html");

    let mut buf = String::new();
    File::open(index_file)
        .map_err(|e| ClientError { msg: e.to_string() })?
        .read_to_string(&mut buf)
        .map_err(|e| ClientError { msg: e.to_string() })?;

    Ok(buf)
}
