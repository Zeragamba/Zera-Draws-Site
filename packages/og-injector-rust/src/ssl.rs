use std::path::PathBuf;

use reqwest::Certificate;
use tokio::fs::File;

fn get_certs_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .expect("Unable to build path to root dir")
        .join(".certs")
}

pub fn get_ssl_cert_path() -> PathBuf {
    get_certs_dir().join("current.crt")
}

pub fn get_ssl_key_path() -> PathBuf {
    get_certs_dir().join("current.key")
}

pub fn get_ssl_cert() -> reqwest::Result<Certificate> {
    let path = get_ssl_cert_path().to_str();

    let mut buf = Vec::new();
    File::open(path.to_str())?.read_to_end(&mut buf)?;

    Certificate::from_pem(&buf)
}
