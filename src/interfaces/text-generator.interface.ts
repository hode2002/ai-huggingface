
export interface TextGenerateOptions {
  prompt: string;
  maxLength?: number;
}

export interface TextGenerateResult {
  data: any;
  error?: string;
}

export interface GradioResponse {
  type: string;
  time: Date;
  data: string[];
  endpoint: string;
  fn_index: number;
}