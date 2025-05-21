export interface ApiError {
  response?: {
    status: number;
    data: {
      message?: string;
      error?: string;
    };
  };
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}