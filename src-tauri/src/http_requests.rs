use tauri::Manager;
use reqwest::Url;
use serde::{Deserialize, Serialize};
use serde_json::Value;

/// 封装 HTTP 请求的结构体
#[derive(Serialize, Deserialize)]
struct HttpRequest {
    url: String,
    method: String,
    headers: Value,
    body: Value,
}

/// 发起 HTTP 请求的函数
#[tauri::command]
pub async fn http_request(request: HttpRequest) -> Result<Value, String> {
    let url = Url::parse(&request.url).map_err(|_| "Invalid URL".to_string())?;
    let method = request.method.to_uppercase();
    let headers = request.headers.as_object().unwrap_or_default().clone();
    let body = serde_json::to_string(&request.body).unwrap_or_default();

    let response = match method.as_str() {
        "GET" => reqwest::Client::new().get(&url).headers(headers).send().await,
        "POST" => reqwest::Client::new().post(&url).headers(headers).body(body).send().await,
        "PUT" => reqwest::Client::new().put(&url).headers(headers).body(body).send().await,
        "DELETE" => reqwest::Client::new().delete(&url).headers(headers).send().await,
        _ => return Err(format!("Unsupported method: {}", method)),
    }?;

    let json_response: Value = response.json().await.map_err(|e| format!("Parse error: {}", e))?;
    Ok(json_response)
}