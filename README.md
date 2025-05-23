# PI Calculator - Monte Carlo Method

This project demonstrates a client-server application for estimating the value of PI using the Monte Carlo method.
The frontend is built with Svelte and Vite, and the backend is a Node.js Express server.
It also includes a WebAssembly module written in Rust for an alternative calculation, an maybe faster, directly in the client.

## Project Structure

- `/client`: Contains the Svelte frontend application.
- `/server`: Contains the Node.js backend server.
- `/wasm`: Contains the rust library, already compiled to WebAssembly.

## Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- WAMS module is included. Instructions to build it are inside that project though

## Setup and Running

### 1. Backend Server

     ```bash
     cd server
     ```

- **Install dependencies:**
  ```bash
  npm install
  ```
- **Start the server:**
  ```bash
  npm start
  ```
- Will run on `http://localhost:3000`.

### 2. Frontend Application

     ```bash
     cd client
     ```

- **Install dependencies:**

  ```bash
  npm install
  ```

- **Start the vite server:**
  ```bash
  npm run dev
  ```
- Will run at `http://localhost:5173` (Vite's default) or another port if 5173 is busy

## How it Works

1.  Enter a number of random points to generate
1.  When clicking the button the client makes a request to (`/random-points?n=N`).
1.  Backend generates random (x, y) points within a square (-1 to 1 for both axes)
1.  The frontend offers two client-side calculation approaches:
    - **Web Worker:** To ensure the UI remains responsive, the counting and PI estimation logic can be performed inside it. The worker counts how many of these points fall within a quarter circle of using the formula: `PI ≈ 4 * (points_inside_circle / total_points)`.
    - **WebAssembly (WASM):** Alternatively, the same calculation can be performed using a compiled WebAssembly module for faster execution
1.  Then calculated estimation is displayed .

### Building the WASM module

prerequisites:

- installing `rustup` and `wasm-pack`

Build command is:

```bash
cd wasm/pi_calculator_lib
wasm-pack build --target web
```

After building, the client application expects the compiled WASM package (JavaScript bindings and the `.wasm` file) to be available
