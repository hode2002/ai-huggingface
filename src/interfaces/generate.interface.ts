import { ServerChoice } from "../types/model.type";

export interface IFluxDevOptions {
  prompt: string;
  seed?: number;
  randomize?: boolean;
  width?: number;
  height?: number;
  guidanceScale?: number;
  numInferenceSteps?: number;
}

export interface IFluxProOptions {
  prompt: string;
  seed?: number;
  randomize?: boolean;
  width?: number;
  height?: number;
  serverChoice?: ServerChoice;
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
