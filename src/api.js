
const API_BASE_URL = "http://localhost:3000";

export async function fetchBars() {
  const response = await fetch(`${API_BASE_URL}/api/bars`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bars: ${response.status}`);
  }

  return response.json();
}

export async function fetchNeighborhoods() {
  const response = await fetch(
    `${API_BASE_URL}/api/neighborhoods`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch neighborhoods: ${response.status}`
    );
  }

  return response.json();
}
