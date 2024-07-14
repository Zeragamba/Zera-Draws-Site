use axum::body::Body;
use axum::extract::Path;
use axum::http::{header, Request, StatusCode};
use axum::response::Response;
use axum::Router;
use axum::routing::get;

use crate::client::ClientFiles;
use crate::injector::{inject_default_meta, inject_post_meta};
use crate::server::{ServerApi, ServerConfig};

pub fn build_router() -> Router {
    Router::new()
        .route("/", get(get_index_html))
        .route("/post/:post_id", get(get_post))
        .fallback(get(get_fallback))
}

async fn get_index_html(req: Request<Body>) -> axum::response::Result<Response> {
    println!("-> GET {}", req.uri());

    let body = inject_default_meta(req.uri()).await?;
    let res = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/html")
        .header("x-generated-by", "rust")
        .body(Body::from(body))
        .unwrap();

    Ok(res)
}

async fn get_post(
    Path(post_id): Path<String>,
    req: Request<Body>,
) -> axum::response::Result<Response> {
    let uri = req.uri();
    println!("-> GET {}", uri);

    let server_api = ServerApi::new(ServerConfig::new()).await?;
    let post_data = server_api.get_post(&post_id).await?;

    let body = inject_post_meta(&post_data).await?;
    let res = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/html")
        .header("x-generated-by", "rust")
        .body(Body::from(body))
        .unwrap();

    Ok(res)
}

async fn get_fallback(req: Request<Body>) -> axum::response::Result<Response> {
    let uri = req.uri();
    println!("-> GET FALLBACK: {}", uri);

    let file_path = uri.path().strip_prefix('/').unwrap_or("");

    let body = ClientFiles::read(file_path).await?;
    let res = Response::builder()
        .status(StatusCode::OK)
        .header("x-generated-by", "rust")
        .body(Body::from(body))
        .unwrap();

    Ok(res)
}
