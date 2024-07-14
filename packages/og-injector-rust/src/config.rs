use env::var_os;
use std::env;
use std::net::IpAddr;
use std::path::PathBuf;

use url::Url;

use crate::config::FeatureFlag::*;

pub enum FeatureFlag {
    Enabled,
    Disabled,
}

pub struct Environment {
    pub app_name: String,
    pub app_url: Url,

    pub injector_host: IpAddr,
    pub injector_port: u16,
    pub injector_https: FeatureFlag,
    pub injector_ssl_crt: Option<PathBuf>,
    pub injector_ssl_key: Option<PathBuf>,

    pub client_dir: PathBuf,

    pub server_url: Url,
    pub server_ssl_crt: Option<PathBuf>,
}

impl Environment {
    pub fn new() -> Self {
        Self {
            app_name: env_str_req("APP_NAME"),
            app_url: env_url_req("APP_URL"),

            injector_host: env_ipaddr("INJECTOR_HOST").unwrap_or("0.0.0.0".parse().unwrap()),
            injector_port: env_port("INJECTOR_PORT").unwrap_or(3000),
            injector_https: env_flag("INJECTOR_HTTPS").unwrap_or(Disabled),
            injector_ssl_crt: env_path("INJECTOR_SSL_CRT"),
            injector_ssl_key: env_path("INJECTOR_SSL_KEY"),

            client_dir: env_path_req("CLIENT_DIR"),

            server_url: env_url_req("SERVER_URL"),
            server_ssl_crt: env_path("SERVER_SSL_CRT"),
        }
    }

    pub fn check() {
        Self::new();
    }
}

fn env_str(key: &str) -> Option<String> {
    var_os(key).map(|value| {
        value
            .to_str()
            .expect(&format!(
                "The environment variable '{key}' should be a unicode string"
            ))
            .to_string()
    })
}

/// Reads a string value from the Environment
///
/// # Panics
///
/// Panics if the variable isn't set
fn env_str_req(key: &str) -> String {
    env_str(key).expect(&format!("The environment variable '{key}' should be set"))
}

/// Reads an IPv4 or IPv6 address value from the Environment
///
/// # Panics
///
/// Panics if the variable isn't set
fn env_ipaddr(key: &str) -> Option<IpAddr> {
    env_str(key).map(|value| {
        value.parse().expect(&format!(
            "The environment variable '{key}' should be an IP Address"
        ))
    })
}

fn env_port(key: &str) -> Option<u16> {
    env_str(key).map(|value| {
        value.parse().expect(&format!(
            "The environment variable '{key}' should be a port"
        ))
    })
}

fn env_url(key: &str) -> Option<Url> {
    env_str(key).map(|value| {
        value
            .parse()
            .expect(&format!("The environment variable '{key}' should be a URL"))
    })
}

fn env_url_req(key: &str) -> Url {
    env_url(key).expect(&format!("The environment variable '{key}' should be set"))
}

fn env_bool(key: &str) -> Option<bool> {
    env_str(key).map(|value| value.parse().unwrap())
}

fn env_flag(key: &str) -> Option<FeatureFlag> {
    env_bool(key).map(|value| if value { Enabled } else { Disabled })
}

fn env_path(key: &str) -> Option<PathBuf> {
    env_str(key).map(|value| {
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join(value)
            .canonicalize()
            .expect(&format!(
                "The environment variable '{key}' should be a valid file path"
            ))
    })
}

fn env_path_req(key: &str) -> PathBuf {
    env_path(key).expect(&format!("The environment variable '{key}' should be set"))
}
