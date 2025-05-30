# AI Image Processing API

<div align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="200"/>
  <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" width="100"/>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
</div>

## What is this?

A powerful AI-powered image processing API that lets you enhance images, generate new ones from text, remove backgrounds, and generate text - all through simple HTTP endpoints.

## Features

### 🖼️ Image Enhancement
Transform your images with AI-powered upscaling and enhancement.

### 🎨 Image Generation
Create stunning images from text descriptions using advanced AI models.

### ✂️ Background Removal
Automatically remove backgrounds from any image.

### 📝 Text Generation
Generate text content based on your prompts.

## Getting Started

### Prerequisites
- Node.js v14+
- Docker (optional)

### Quick Start

```bash
# Clone and setup
git clone https://github.com/hode2002/ai-huggingface.git
cd ai-huggingface
npm install

# Configure
cp .env.example .env

# Start the server
npm run dev
```

## API Reference

### Base URL
```
http://localhost:3002
```

### Endpoints

#### Enhance Image
```typescript
POST /enhance

// Request
{
  "image": "https://example.com/image.jpg",
  "size": "2x"  // Optional: "2x" | "4x" | "8x"
}

// Response
{
  "success": true,
  "data": {
    "enhancedImageUrl": "https://..."
  }
}
```

#### Generate Image
```typescript
POST /generate?model=fluxDev

// Request
{
  "prompt": "A beautiful sunset over mountains",
  "negative_prompt": "blurry, low quality",  // Optional
  "num_inference_steps": 50,                 // Optional
  "guidance_scale": 7.5                      // Optional
}

// Response
{
  "success": true,
  "data": {
    "generatedImageUrl": "https://..."
  }
}
```

#### Remove Background
```typescript
POST /remove-background

// Request
{
  "imageUrl": "https://example.com/image.jpg"
}

// Response
{
  "success": true,
  "data": {
    "imageUrl": "https://..."
  }
}
```

#### Generate Text
```typescript
POST /text

// Request
{
  "prompt": "Write a story about a magical forest",
  "maxLength": 100  // Optional
}

// Response
{
  "success": true,
  "data": {
    "prompt": "Generated text..."
  }
}
```

## Usage Examples

### TypeScript

```typescript
// Enhance an image
const enhanceImage = async (imageUrl: string) => {
  const response = await fetch('http://localhost:3002/enhance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageUrl, size: '2x' })
  });
  return response.json();
};

// Generate an image
const generateImage = async (prompt: string) => {
  const response = await fetch('http://localhost:3002/generate?model=fluxDev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      negative_prompt: 'blurry, low quality',
      num_inference_steps: 50,
      guidance_scale: 7.5
    })
  });
  return response.json();
};
```

### JavaScript

```javascript
// Remove background
const removeBackground = async (imageUrl) => {
  const response = await fetch('http://localhost:3002/remove-background', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl })
  });
  return response.json();
};

// Generate text
const generateText = async (prompt) => {
  const response = await fetch('http://localhost:3002/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxLength: 100 })
  });
  return response.json();
};
```

## Development

### Project Structure
```
src/
├── controllers/     # API route handlers
├── services/       # Business logic
├── interfaces/     # TypeScript interfaces
├── types/         # Type definitions
├── config/        # Configuration
└── server.ts      # Entry point
```
