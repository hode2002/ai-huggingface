
export interface EnhanceOptions {
  image: Blob | File | Buffer;
  size?: "2x" | "4x" | "8x";
}

export interface EnhanceResult {
  data: string;
  error?: string;
}

export interface GradioImageResponse {
  path: string;
  url: string;
  size: number | null;
  orig_name: string;
  mime_type: string | null;
  is_stream: boolean;
  meta: Record<string, unknown>;
}

export interface GradioResponse {
  type: string;
  time: Date;
  data: GradioImageResponse[];
  endpoint: string;
  fn_index: number;
}