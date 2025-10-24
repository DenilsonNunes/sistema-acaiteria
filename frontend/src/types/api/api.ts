export interface HttpError {
  statusCode: number;
  message: string | string[];
  error: string;
}