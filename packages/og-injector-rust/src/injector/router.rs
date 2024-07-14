use axum::body::Body;
use axum::extract::Path;
use axum::http::Request;
use axum::Router;
use axum::routing::get;

use crate::client::ClientFiles;
use crate::injector::{inject_default_meta, inject_post_meta, inject_tag_meta};
use crate::injector::router_response::RouterResponse;
use crate::server_api::{ServerApi, ServerConfig};

type Result = axum::response::Result<RouterResponse>;

pub fn build_router() -> Router {
    Router::new()
        .route("/", get(get_index))
        .route("/latest", get(get_latest))
        .route("/post/:post_id", get(get_post))
        .route("/tag/:tag_id", get(get_tag))
        .fallback(get(get_fallback))
}

async fn get_index(req: Request<Body>) -> Result {
    println!("-> GET {}", req.uri());

    let body = inject_default_meta(req.uri()).await?;
    Ok(RouterResponse::Html(body))
}

async fn get_post(Path(post_id): Path<String>, req: Request<Body>) -> Result {
    let uri = req.uri();
    println!("-> GET {}", uri);

    let server_api = ServerApi::new(ServerConfig::new()).await?;
    let post_data = server_api.get_post(&post_id).await?;

    let body = inject_post_meta(&post_data).await?;
    Ok(RouterResponse::Html(body))
}

async fn get_latest(req: Request<Body>) -> Result {
    let uri = req.uri();
    println!("-> GET {}", uri);

    let server_api = ServerApi::new(ServerConfig::new()).await?;
    let post_data = server_api.get_latest().await?;

    let body = inject_post_meta(&post_data).await?;
    Ok(RouterResponse::Html(body))
}

async fn get_tag(Path(tag_id): Path<String>, req: Request<Body>) -> Result {
    let uri = req.uri();
    println!("-> GET {}", uri);

    let server_api = ServerApi::new(ServerConfig::new()).await?;
    let tag_data = server_api.get_tag(&tag_id).await?;

    let body = inject_tag_meta(&tag_data).await?;
    Ok(RouterResponse::Html(body))
}

async fn get_fallback(req: Request<Body>) -> Result {
    let uri = req.uri();
    println!("-> GET FALLBACK: {}", uri);

    let file_path = uri.path().strip_prefix('/').unwrap_or("");

    let body = ClientFiles::read(file_path).await?;
    Ok(RouterResponse::Html(body))
}
