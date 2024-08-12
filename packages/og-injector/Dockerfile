FROM rust AS builder

WORKDIR /opt/build

COPY . .
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=./target \
    cargo build --release \
    && mkdir /opt/dist \
    && cp ./target/release/og-injector /opt/dist/og-injector

FROM ubuntu
COPY --from=builder /opt/dist/og-injector /usr/bin

CMD ["og-injector"]
