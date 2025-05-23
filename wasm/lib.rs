// Lib to generate a wasm module to calculate pi using the same simple monte carlo method as the worker.
// I did fixed a few errors with Gemini as I havent used wasm and Rust in a while.
// sources:
// https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Rust_to_Wasm
// https://users.rust-lang.org/t/how-to-build-a-simple-https-rustwasm-github-io-wasm-bindgen-api-wasm-bindgen-struct-jsvalue-html/76681
// https://rustwasm.github.io/wasm-bindgen/api/js_sys/index.html

use js_sys;
use serde::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(Deserialize)]
struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
pub fn calculate_pi_rust(points_js: JsValue, num_points: usize) -> Result<f64, JsValue> {
    let points: Vec<Point> = serde_wasm_bindgen::from_value(points_js)
        .map_err(|e| JsValue::from_str(&format!("Couln't deserialize points. Error: {}", e)))?;

    let mut points_inside_circle = 0;
    for point in points {
        if point.x * point.x + point.y * point.y <= 1.0 {
            points_inside_circle += 1;
        }
    }

    Ok(4.0 * (points_inside_circle as f64) / (num_points as f64))
}
