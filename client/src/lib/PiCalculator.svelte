<script>
  // This component calculates the value of PI using the Monte Carlo method
  // using a Web Worker for the calculation to avoid blocking the main thread.
  // and a placeholder for WASM implementation which should make the same calculation, faster.

  import MonteCarloWorker from './monteCarlo.worker.js?worker';

  //default values
  let numPointsWorker = 1000;
  let numPointsWasm = 1000;
  let piValue = '-';
  let isLoading = false;

  async function calculatePiWorker() {
    if (numPointsWorker <= 0 || !Number.isInteger(numPointsWorker)) {
      console.error('Error: Invalid input');
      piValue = '-';
      return;
    }

    isLoading = true;
    piValue = 'Calculating...';

    try {
      // fetch from server, Url should be moved to an env variable or config in a real app
      const response = await fetch(`http://localhost:3000/random-points?n=${numPointsWorker}`);
      
      if (!response.ok) {
        console.error('Server error', response.status);
        throw new Error('Failed to fetching points from server');
      }

      // Check if the response is valid
      const fetchedPoints = await response.json();

      if (!Array.isArray(fetchedPoints) || fetchedPoints.length !== numPointsWorker) {
        throw new Error('Invalid data received from server.');
      }

      // Unload calculation to the worker
      const worker = new MonteCarloWorker();

      worker.onmessage = (event) => {
        if (event.data.error) {
          console.error('Worker calculation error:', event.data.error);
          piValue = 'Error';
        } else {
          piValue = event.data.pi.toFixed(6);
        }
        isLoading = false;
        worker.terminate();
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error.message || 'Rorker error');
        piValue = 'Error';
        isLoading = false;
        worker.terminate();
      };

      worker.postMessage({ points: fetchedPoints, numPoints: numPointsWorker });

    } catch (error) {
      console.error('Error during Pi calculation:', error instanceof Error ? error.message : error);
      piValue = 'Error';
      isLoading = false; // cancel loading when failed
    }
  }

  async function calculatePiWasm() {
    // TODO: calculation using WASM and single fetch function
    console.log('WASM calculation called', numPointsWasm);
  }
</script>

<main>
  <h1>Monte Carlo 🥧 Calculator</h1>

  <div class="controls-container">
    <div class="input-group">
      <label for="numPointsWorker">Worker Points:</label>
      <input type="number" id="numPointsWorker" bind:value={numPointsWorker} min="1" disabled={isLoading} />
          <button on:click={calculatePiWorker} disabled={isLoading}>
      {isLoading ? 'Calculating...' : 'Calculate 𝝅 with Worker'}
    </button>
    </div>
    <div class="input-group">
      <label for="numPointsWasm">WASM Points (Not implemented yet):</label>
      <input type="number" id="numPointsWasm" bind:value={numPointsWasm} min="1" disabled={isLoading} />
          <button on:click={calculatePiWasm} disabled={isLoading}>
      {isLoading ? 'Calculating...' : 'Calculate 𝝅 with WASM'}
    </button>
    </div>
  </div>

  <div class="result">
    <h2>Estimated Value of PI:</h2>
    <p>{piValue}</p>
  </div>
</main>

<style>
  main {
    padding: 3em;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f2f2f2;
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5em;
  }

  .controls-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 1em;
    margin: auto;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-group label {
    font-weight: bold;
    font-size: 0.9em;
  }

  input[type="number"] {
    padding: 0.5em;
    border: 1px solid #ccc;
    flex-grow: 1;
    border-radius: 3px;
  }

  button {
    padding: 0.5em 1em;
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .result {
    margin-top: 1.5em;
    text-align: center;
    margin-bottom: 0.5em;
  }
</style>
