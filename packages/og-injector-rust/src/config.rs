use std::env;
use std::net::{IpAddr, SocketAddr};
use std::path::PathBuf;

use reqwest::Certificate;
use tokio::fs::File;
use tokio::io::AsyncReadExt;

pub enum FeatureFlag {
    Enabled,
    Disabled,
}

fn load_env_str(key: &str) -> Option<String> {
    env::var_os(key).map(|value| value.to_str().unwrap_or_default().to_string())
}

fn load_env_num(key: &str) -> Option<i64> {
    load_env_str(key).map(|value| value.parse().unwrap())
}

fn load_env_bool(key: &str) -> Option<bool> {
    load_env_str(key).map(|value| value.parse().unwrap())
}

pub fn get_app_host() -> IpAddr {
    load_env_str("APP_HOST")
        .unwrap_or("0.0.0.0".to_string())
        .parse()
        .expect("Unable to parse APP_HOST. Is it a valid IP Address?")
}

pub fn get_app_port() -> u16 {
    load_env_num("APP_PORT")
        .unwrap_or(3000)
        .try_into()
        .expect("Unable to parse APP_PORT. Is it a valid port number?")
}

pub fn get_app_socket() -> SocketAddr {
    SocketAddr::new(get_app_host(), get_app_port())
}

pub fn is_https_enabled() -> FeatureFlag {
    load_env_bool("HTTPS_ENABLED")
        .map(|value| if value { FeatureFlag::Enabled } else { FeatureFlag::Disabled })
        .unwrap_or(FeatureFlag::Enabled)
}

fn get_default_certs_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .unwrap()
        .join(".certs")
}

pub fn get_ssl_cert_path() -> PathBuf {
    load_env_str("SSL_CRT")
        .map(|value| PathBuf::from(value))
        .unwrap_or_else(|| get_default_certs_dir().join("current.crt"))
}

pub fn get_ssl_key_path() -> PathBuf {
    load_env_str("SSL_KEY")
        .map(|value| PathBuf::from(value))
        .unwrap_or_else(|| get_default_certs_dir().join("current.crt"))
}

pub async fn get_ssl_cert() -> Certificate {
    let cert_path = get_ssl_cert_path();

    let path: &str = cert_path.to_str().unwrap();

    let mut buf = Vec::new();
    File::open(path)
        .await
        .map_err(|e| panic!("{}", e))
        .unwrap()
        .read_to_end(&mut buf)
        .await
        .map_err(|e| panic!("{}", e))
        .unwrap();

    Certificate::from_pem(&buf).unwrap()
}
