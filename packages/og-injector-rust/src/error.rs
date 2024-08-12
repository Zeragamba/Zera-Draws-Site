use std::error::Error;
use std::fmt;
use std::str::Utf8Error;

use axum::body::Body;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

use crate::open_graph::open_graph_data::OpenGraphDataBuilderError;

pub type AppResult<T> = Result<T, AppError>;

#[derive(Debug)]
pub enum AppError {
    InternalServerError(String),
    NotFoundError(String),
}

impl AppError {
    pub fn new(msg: String) -> AppError {
        AppError::InternalServerError(msg)
    }
}

impl Error for AppError {}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::InternalServerError(msg) => write!(f, "InternalServerError: {}", msg),
            AppError::NotFoundError(msg) => write!(f, "NotFoundError: {}", msg),
        }
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let body = self.to_string();
        eprintln!("{}", body);

        let status_code = match self {
            AppError::InternalServerError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::NotFoundError(_) => StatusCode::NOT_FOUND,
        };

        Response::builder()
            .status(status_code)
            .body(Body::from(body))
            .unwrap()
    }
}

impl From<std::io::Error> for AppError {
    fn from(error: std::io::Error) -> Self {
        AppError::new(error.to_string())
    }
}

impl From<serde_json::Error> for AppError {
    fn from(error: serde_json::Error) -> Self {
        AppError::new(error.to_string())
    }
}

impl From<reqwest::Error> for AppError {
    fn from(error: reqwest::Error) -> Self {
        AppError::new(error.to_string())
    }
}

impl From<OpenGraphDataBuilderError> for AppError {
    fn from(error: OpenGraphDataBuilderError) -> Self {
        AppError::new(error.to_string())
    }
}

impl From<Utf8Error> for AppError {
    fn from(error: Utf8Error) -> Self {
        AppError::new(error.to_string())
    }
}
