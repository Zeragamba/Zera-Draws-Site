use std::{env, fmt};
use std::fmt::Debug;

use reqwest;
use reqwest::Url;
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

pub fn get_client_url() -> Result<Url, ClientError> {
    let client_url = match env::var_os("CLIENT_INDEX_URL") {
        Some(value) => value.into_string().unwrap(),
        None => "https://localhost:3001/index.html".to_owned(),
    };

    Url::parse(&client_url).map_err(|e| ClientError { msg: e.to_string() })
}

pub async fn fetch_index_html() -> Result<String, ClientError> {
    let root_cert = config::get_ssl_cert().await;

    let client = reqwest::ClientBuilder::new()
        .add_root_certificate(root_cert)
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| ClientError { msg: e.to_string() })?;

    let client_url = get_client_url()?;
    println!("fetching index from {}", client_url);
    let resp = client
        .get(client_url)
        .send()
        .await
        .map_err(|e| ClientError { msg: e.to_string() })?;

    println!("{resp:#?}");
    resp.text()
        .await
        .map_err(|e| ClientError { msg: e.to_string() })
}
