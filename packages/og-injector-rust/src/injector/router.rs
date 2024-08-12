use axum::body::Body;
use axum::extract::Path;
use axum::http::Request;
use axum::routing::get;
use axum::Router;
use mime_guess::mime;

use crate::client::ClientFiles;
use crate::injector::router_response::RouterResponse;
use crate::injector::{inject_default_meta, inject_post_meta, inject_tag_meta};
use crate::server_api::{ServerApi, ServerConfig};

type Result = axum::response::Result<RouterResponse>;

pub fn build_router() -> Router {
    Router::new()
        .route("/latest", get(get_latest))
        .route("/post/:post_id", get(get_post))
        .route("/tag/:tag_id/:post_id", get(get_post))
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

    if let Some(_) = req.headers().get("X-No-Try-Files") {
        return get_index(req).await;
    }

    let file_path = uri.path().strip_prefix('/').unwrap_or("");

    let client_file = ClientFiles::read_raw(file_path).await;
    match client_file {
        Err(_) => get_index(req).await,
        Ok(body) => {
            let mime_type = mime_guess::from_path(uri.to_string())
                .first()
                .unwrap_or(mime::APPLICATION_OCTET_STREAM);

            Ok(RouterResponse::Raw { body, mime_type })
        }
    }
}
