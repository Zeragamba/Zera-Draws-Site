use reqwest;

use crate::ssl;

pub async fn fetch_index_html() -> Result<String, reqwest::Error> {
    let client = reqwest::ClientBuilder::new()
        .add_root_certificate(ssl::get_ssl_cert_path())
        .danger_accept_invalid_certs(true)
        .build()?;

    let resp = client.get("https://localhost:3000").send().await?;

    println!("{resp:#?}");
    resp.text().await
}
