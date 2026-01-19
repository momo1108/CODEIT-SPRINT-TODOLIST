interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiCall<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    // console.dir(response);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(errorMessage);
    return { error: errorMessage };
  }
}

export { apiCall };
