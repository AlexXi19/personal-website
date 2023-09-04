FROM rust:latest as builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src \
    && echo "fn main() {}" > src/main.rs \
    && cargo build --release \
    && rm -rf src

COPY . .

RUN mkdir upload

RUN cargo build

EXPOSE 8000

CMD cargo run
