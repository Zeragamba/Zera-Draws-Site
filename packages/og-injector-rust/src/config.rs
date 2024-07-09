use env::var_os;
use std::env;
use std::net::IpAddr;
use std::path::PathBuf;

use crate::config::FeatureFlag::*;

pub enum FeatureFlag {
    Enabled,
    Disabled,
}

pub struct Environment {
    pub injector_host: IpAddr,
    pub injector_port: u16,
    pub injector_https: FeatureFlag,
    pub injector_ssl_crt: Option<PathBuf>,
    pub injector_ssl_key: Option<PathBuf>,

    pub client_url: String,
    pub client_dir: PathBuf,

    pub server_url: String,
    pub server_ssl_crt: Option<PathBuf>,
}

impl Environment {
    pub fn new() -> Self {
        Self {
            injector_host: env_ipaddr("INJECTOR_HOST").unwrap_or("0.0.0.0".parse().unwrap()),
            injector_port: env_port("INJECTOR_PORT").unwrap_or(3000),
            injector_https: env_flag("INJECTOR_HTTPS").unwrap_or(Disabled),
            injector_ssl_crt: env_path("INJECTOR_SSL_CRT"),
            injector_ssl_key: env_path("INJECTOR_SSL_KEY"),

            client_url: env_str_req("CLIENT_URL"),
            client_dir: env_path_req("CLIENT_DIR"),

            server_url: env_str_req("SERVER_URL"),
            server_ssl_crt: env_path("SERVER_SSL_CRT"),
        }
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

fn env_str_req(key: &str) -> String {
    env_str(key).expect(&format!("The environment variable '{key}' should be set"))
}

fn env_ipaddr(key: &str) -> Option<IpAddr> {
    env_str(key).map(|value| {
        value.parse().expect(&format!(
            "The environment variable '{key}' should be an IP Address"
        ))
    })
}

fn env_ipaddr_or(key: &str, default: IpAddr) -> IpAddr {
    env_ipaddr(key).unwrap_or(default)
}

fn env_port(key: &str) -> Option<u16> {
    env_str(key).map(|value| {
        value.parse().expect(&format!(
            "The environment variable '{key}' should be a port"
        ))
    })
}

fn env_port_or(key: &str, default: u16) -> u16 {
    env_port(key).unwrap_or(default)
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
