use axum::body::Body;
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Response};
use mime::Mime;

pub enum RouterResponse {
    Html(String),
    Raw { body: Vec<u8>, mime_type: Mime },
}

impl IntoResponse for RouterResponse {
    fn into_response(self) -> Response {
        match self {
            RouterResponse::Html(body) => Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "text/html")
                .header("x-generated-by", "rust")
                .body(Body::from(body))
                .unwrap(),
            RouterResponse::Raw { body, mime_type } => Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime_type.to_string())
                .header("x-generated-by", "rust")
                .body(Body::from(body))
                .unwrap(),
        }
    }
}
