use std::{env, fmt};
use std::env::VarError;
use std::fmt::Debug;

use reqwest;
use reqwest::Url;

use crate::ssl;

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
    let client_url = match env::var("CLIENT_INDEX_URL") {
        Ok(value) => Ok(value),
        Err(err) => {
            match err {
                VarError::NotPresent => Ok("https://localhost:3001/index.html".parse().unwrap()),
                VarError::NotUnicode(_) => Err(ClientError { msg: "Unable to read env var SSL_CRT".parse().unwrap() })
            }
        }
    }?;

    Url::parse(client_url.as_str())
        .map_err(|e| ClientError { msg: e.to_string() })
}


pub async fn fetch_index_html() -> Result<String, ClientError> {
    let root_cert = ssl::get_ssl_cert().await
        .map_err(|e| ClientError { msg: e.to_string() })?;

    let client = reqwest::ClientBuilder::new()
        .add_root_certificate(root_cert)
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| ClientError { msg: e.to_string() })?;

    let client_url = get_client_url()?;
    println!("fetching index from {}", client_url);
    let resp = client.get(client_url).send().await
        .map_err(|e| ClientError { msg: e.to_string() })?;

    println!("{resp:#?}");
    resp.text().await
        .map_err(|e| ClientError { msg: e.to_string() })
}
