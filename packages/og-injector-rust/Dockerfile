FROM rust as builder

WORKDIR /usr/src/app
COPY . .
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/home/root/app/target \
    cargo build --release

FROM ubuntu

COPY --from=builder /usr/src/app/target/release/og-injector-rust /usr/bin

CMD ["og-injector-rust"]
