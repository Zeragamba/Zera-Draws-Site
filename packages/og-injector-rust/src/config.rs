use std::env;
use std::net::{IpAddr, SocketAddr};
use std::path::PathBuf;

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

fn load_env_path(key: &str) -> Option<PathBuf> {
    load_env_str(key).map(|value| {
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join(value)
            .canonicalize()
            .unwrap()
    })
}

pub fn get_injector_host() -> IpAddr {
    let addr = load_env_str("INJECTOR_HOST").unwrap_or("0.0.0.0".to_string());

    println!("INJECTOR_HOST: {}", addr);

    match addr.parse() {
        Ok(addr) => addr,
        Err(e) => panic!("{}", e),
    }
}

pub fn get_app_port() -> u16 {
    let port = load_env_num("INJECTOR_PORT")
        .unwrap_or(3000);

    println!("INJECTOR_PORT: {}", port);

    match port.try_into() {
        Ok(addr) => addr,
        Err(_) => panic!("Unable to parse APP_PORT. Is it a valid port number?"),
    }
}

pub fn get_app_socket() -> SocketAddr {
    SocketAddr::new(get_injector_host(), get_app_port())
}

pub fn is_https_enabled() -> FeatureFlag {
    load_env_bool("HTTPS_ENABLED")
        .map(|value| {
            if value {
                FeatureFlag::Enabled
            } else {
                FeatureFlag::Disabled
            }
        })
        .unwrap_or(FeatureFlag::Disabled)
}

pub fn get_certs_dir() -> PathBuf {
    load_env_path("CERTS_DIR").unwrap_or_else(|| {
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("../../.certs")
            .canonicalize()
            .unwrap()
            .join(".certs")
    })
}

pub fn get_ssl_cert_path() -> PathBuf {
    load_env_path("SSL_CRT").unwrap_or_else(|| get_certs_dir().join("current.crt"))
}

pub fn get_ssl_key_path() -> PathBuf {
    load_env_path("SSL_KEY").unwrap_or_else(|| get_certs_dir().join("current.crt"))
}

pub fn client_dir() -> PathBuf {
    load_env_path("CLIENT_DIR")
        .expect("The environment variable 'CLIENT_DIR' should be set in '.env'")
}

// pub fn client_url() -> Result<Url, ClientError> {
//     let client_url = match env::var_os("CLIENT_INDEX_URL") {
//         Some(value) => value.into_string().unwrap(),
//         None => "https://localhost:3001/index.html".to_owned(),
//     };
//
//     Url::parse(&client_url).map_err(|e| ClientError { msg: e.to_string() })
// }
