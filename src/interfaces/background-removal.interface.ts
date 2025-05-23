export interface BackgroundRemovalOptions {
  imageUrl: string;
}

export interface BackgroundRemovalResult {
  processedImageUrl: string;
}

export interface GradioResponse {
  data: any
  is_generating: boolean;
  duration: number;
  average_duration: number;
} 