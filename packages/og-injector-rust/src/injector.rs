pub use injector::inject_meta;
pub use injector_config::InjectorConfig;
pub use injector_error::InjectorError;

mod injector;
mod injector_error;
mod injector_config;

pub type Result<T> = std::result::Result<T, InjectorError>;
