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

    if (!response.ok) {
      // 에러 응답 body 파싱
      let errorMessage = `API Error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // JSON 파싱 실패하면 statusText 사용
        errorMessage = `${response.status} ${response.statusText}`;
      }
      
      console.error(`[${url}] ${errorMessage}`);
      throw new Error(errorMessage);
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
