use std::{env, fmt};
use std::env::VarError;
use std::path::PathBuf;

use reqwest::Certificate;
use tokio::fs::File;
use tokio::io::AsyncReadExt;

type Result<T> = std::result::Result<T, SslError>;

#[derive(Debug, Clone)]
pub struct SslError {
    msg: String,
}

impl fmt::Display for SslError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.msg)
    }
}

fn get_default_certs_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .expect("Unable to build path to root dir")
        .join(".certs")
}

pub fn get_ssl_cert_path() -> Result<PathBuf> {
    match env::var("SSL_CRT") {
        Ok(value) => Ok(PathBuf::from(value)),
        Err(err) => {
            match err {
                VarError::NotPresent => Ok(get_default_certs_dir().join("current.crt")),
                VarError::NotUnicode(_) => Err(SslError { msg: "Unable to read env var SSL_CRT".parse().unwrap() })
            }
        }
    }
}

pub fn get_ssl_key_path() -> Result<PathBuf> {
    match env::var("SSL_KEY") {
        Ok(value) => Ok(PathBuf::from(value)),
        Err(err) => {
            match err {
                VarError::NotPresent => Ok(get_default_certs_dir().join("current.key")),
                VarError::NotUnicode(_) => Err(SslError { msg: "Unable to read env var SSL_CRT".parse().unwrap() })
            }
        }
    }
}

pub async fn get_ssl_cert() -> Result<Certificate> {
    let cert_path = get_ssl_cert_path()?;

    let path: &str = cert_path
        .to_str()
        .ok_or(SslError { msg: "Expected to find a path".parse().unwrap() })?;

    let mut buf = Vec::new();
    File::open(path).await
        .map_err(|e| SslError { msg: e.to_string() })?
        .read_to_end(&mut buf).await
        .map_err(|e| SslError { msg: e.to_string() })?;

    Certificate::from_pem(&buf)
        .map_err(|e| SslError { msg: e.to_string() })
}
