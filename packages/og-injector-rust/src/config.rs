use env::var_os;
use std::env;
use std::path::PathBuf;

pub enum FeatureFlag {
    Enabled,
    Disabled,
}

pub struct Config;

impl Config {
    pub fn env_str(key: &str) -> Option<String> {
        var_os(key).map(|value| value.to_str().unwrap_or_default().to_string())
    }

    pub fn env_int(key: &str) -> Option<i64> {
        Self::env_str(key).map(|value| value.parse().unwrap())
    }

    pub fn env_bool(key: &str) -> Option<bool> {
        Self::env_str(key).map(|value| value.parse().unwrap())
    }

    pub fn env_path(key: &str) -> Option<PathBuf> {
        Self::env_str(key).map(|value| {
            PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                .join(value)
                .canonicalize()
                .unwrap()
        })
    }
}
