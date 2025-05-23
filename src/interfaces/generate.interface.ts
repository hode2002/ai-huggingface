export interface GenerateOptions {
  prompt: string;
  seed?: number;
  randomizeSeed?: boolean;
  width?: number;
  height?: number;
  guidanceScale?: number;
  numInferenceSteps?: number;
}

export interface GenerateResult {
  data: string;
  error?: string;
}

export interface GradioResponse {
  data: Array<{
    url: string;
  }>;
} 