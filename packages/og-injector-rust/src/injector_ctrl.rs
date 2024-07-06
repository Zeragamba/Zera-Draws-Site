use axum::body::Body;
use axum::http::{header, Request, StatusCode};
use axum::response::Response;
use axum::Router;
use axum::routing::get;

use crate::client;

pub fn router() -> Router {
    Router::new().route("/", get(get_index_html))
}

pub async fn get_index_html(req: Request<Body>) -> Response {
    println!("-> GET {}", req.uri());

    match client::fetch_index_html().await {
        Err(error) => Response::builder()
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(Body::from(error.to_string()))
            .unwrap(),

        Ok(index_html) => Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, "text/html")
            .header("x-generated-by", "rust")
            .body(Body::from(index_html))
            .unwrap(),
    }
}
