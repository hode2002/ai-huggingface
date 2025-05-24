# Build stage
FROM node:20-alpine AS builder

WORKDIR /app/huggingface

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app/huggingface

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/huggingface/dist ./dist

EXPOSE 3002

CMD ["npm", "run", "start"]