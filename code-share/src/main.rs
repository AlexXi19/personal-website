use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use std::collections::HashMap;
use std::env;
use std::io;
use std::path::Path;
use std::sync::Arc;
use std::sync::RwLock;
pub mod paste_id;

use crate::paste_id::Paste;

async fn upload(
    req: HttpRequest,
    body: web::Bytes,
    data: web::Data<Arc<RwLock<HashMap<String, Option<String>>>>>,
) -> impl Responder {
    let host = env::var("HOST").unwrap_or_else(|_| "localhost:8000".to_string());

    let headers = req.headers();

    // Get a particular header
    let ext = match headers.get("ext") {
        Some(ext) => match ext.to_str() {
            Ok(ext) => Some(String::from(ext)),
            Err(_) => None,
        },
        None => None,
    };

    let file_content = String::from_utf8_lossy(&body);

    let paste = Paste {
        ext,
        content: file_content.to_string(),
    };

    println!("Uploading paste : {:?}", paste);
    paste.write();
    let paste_id = paste.id();

    let map = data.clone();
    let hash = paste.hash();
    let mut m = map.write().unwrap();
    let ext = paste.ext.clone();
    m.insert(hash.clone(), ext);

    let url = format!("{}/{}", host, paste_id);
    HttpResponse::Ok().body(url)
}

async fn retrieve(
    data: web::Data<Arc<RwLock<HashMap<String, Option<String>>>>>,
    id: web::Path<String>,
) -> impl Responder {
    println!("Retrieving paste with id: {}", id);
    let default_res = String::from("<h1>Not Found</h1>");
    let map = data;
    let id = id.to_string();

    let ext = {
        let m = map.read().unwrap();
        match m.get(&id) {
            Some(ext) => ext.clone(),
            None => return HttpResponse::NotFound().body(default_res),
        }
    };

    let content = {
        let hash = id.to_string();
        let path = match ext {
            Some(ref ext) => format!("{}.{}", hash, ext),
            None => hash.clone(),
        };
        let path = Path::new(concat!(env!("CARGO_MANIFEST_DIR"), "/", "upload")).join(path);

        match std::fs::read_to_string(path) {
            Ok(content) => content,
            Err(_) => return HttpResponse::NotFound().body(default_res),
        }
    };

    let p = Paste { ext, content };

    match p.highlighted_html() {
        Some(res) => HttpResponse::Ok().body(res),
        None => HttpResponse::NotFound().body(default_res),
    }
}

async fn index() -> impl Responder {
    "
USAGE

  POST /

      accepts raw data in the body of the request and responds with a URL of
      a page containing the body's content

      EXAMPLE:  curl -X POST -H \"ext: lua\" --data-binary @/tmp/lua_Bsk6Hw http://localhost:8000

  GET /<id>

      retrieves the content for the paste with id `<id>`
"
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    let m = Arc::new(RwLock::new(HashMap::new()));
    let m_cloned = m.clone();
    let mut m_write = m_cloned.write().unwrap();
    for entry in std::fs::read_dir("upload").unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let ext = match path.extension() {
            Some(ext) => match ext.to_str() {
                Some(ext) => Some(ext.to_string()),
                None => None,
            },
            None => None,
        };
        let id = path.file_stem().unwrap().to_str().unwrap().to_string();
        m_write.insert(id, ext);
    }
    drop(m_write);

    HttpServer::new(move || {
        let m = m.clone();
        App::new()
            .route("/", web::post().to(upload))
            .route("/{id}", web::get().to(retrieve))
            .route("/", web::get().to(index))
            .app_data(web::Data::new(m))
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
