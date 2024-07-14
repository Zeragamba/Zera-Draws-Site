use axum::body::Body;
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Response};

pub enum RouterResponse {
    Html(String),
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
        }
    }
}
