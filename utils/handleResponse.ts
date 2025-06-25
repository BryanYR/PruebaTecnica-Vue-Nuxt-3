export interface APIErrorResponse {
  code: number;
  message: string;
}

export function handleResponseFailure(error: unknown): APIErrorResponse {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const message =
      (typeof error.response?.data === "string" && error.response.data) ||
      error.response?.statusText ||
      error.message ||
      "Error desconocido";

    return { code: status, message };
  }

  return {
    code: 0,
    message: (error as any)?.message ?? "Error desconocido",
  };
}

// 👇 Tipo básico para validar Axios errors
function isAxiosError(error: unknown): error is {
  response?: { status: number; statusText: string; data?: any };
  message: string;
} {
  return typeof error === "object" && error !== null && "message" in error;
}
