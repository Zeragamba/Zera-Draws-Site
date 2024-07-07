pub use server_config::ServerConfig;
pub use server_error::ServerError;

mod server_api;
mod server_config;
mod server_error;

pub type Result<T> = std::result::Result<T, ServerError>;
