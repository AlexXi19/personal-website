use std::path::{Path, PathBuf};

use ring::digest::{Context, SHA256};
use serde_derive::Deserialize;
use syntect::highlighting::{Color, ThemeSet};
use syntect::html::highlighted_html_for_file;
use syntect::parsing::SyntaxSet;

fn calculate_hash(content: &str) -> String {
    let mut context = Context::new(&SHA256);
    context.update(content.as_bytes());
    let digest = context.finish();
    let hash = digest.as_ref();

    // Convert the hash bytes to a hexadecimal string
    let hex_string: String = hash.iter().map(|b| format!("{:02x}", b)).collect();

    hex_string.chars().take(6).collect()
}

#[derive(Debug, Deserialize)]
pub struct Paste {
    pub content: String,
    pub ext: Option<String>,
}

impl Paste {
    pub fn id(&self) -> String {
        calculate_hash(&self.content)
    }

    pub fn get_path(&self) -> PathBuf {
        let hash = calculate_hash(&self.content);
        let path = match self.ext {
            Some(ref ext) => format!("{}.{}", hash, ext),
            None => hash.clone(),
        };
        let full_path = Path::new(concat!(env!("CARGO_MANIFEST_DIR"), "/", "upload")).join(path);

        return PathBuf::from(full_path);
    }

    pub fn hash(&self) -> String {
        calculate_hash(&self.content)
    }

    pub fn write(&self) -> String {
        let hash = calculate_hash(&self.content);
        let file_path = self.get_path();
        std::fs::write(file_path, &self.content).unwrap();

        hash
    }

    pub fn highlighted_html(&self) -> Option<String> {
        let path = self.get_path();
        let ss = SyntaxSet::load_defaults_newlines();
        let ts = ThemeSet::load_defaults();

        let res = "";
        let style = "
        pre {
            font-size:13px;
            font-family: Consolas, \"Liberation Mono\", Menlo, Courier, monospace;
        }";
        let meta = &format!(
            "<head><title>{}</title><style>{}</style></head>",
            "Share", style
        );
        let theme = &ts.themes["base16-ocean.dark"];
        let c = theme.settings.background.unwrap_or(Color::WHITE);
        let bg = format!(
            "<body style=\"background-color:#{:02x}{:02x}{:02x};\">\n",
            c.r, c.g, c.b
        );
        let html = highlighted_html_for_file(path, &ss, theme).unwrap();
        let close_body = "</body>";

        return Some(format!("{}{}{}{}{}", res, meta, bg, html, close_body));
    }
}
