# ============================================================
# EcoSabon — Development Dockerfile
# Runs both client (Vite) and server (Express) via concurrently
# ============================================================

FROM node:22-alpine

# Install build tools needed by native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# ---------- 1) Copy package manifests first (for caching) ----------
COPY package.json ./
COPY shared/package.json shared/tsconfig.json ./shared/
COPY server/package.json server/tsconfig.json ./server/
COPY client/package.json ./client/
# Copy additional tsconfig files if present
COPY client/tsconfig.json client/tsconfig.app.json client/tsconfig.node.json ./client/

# ---------- 2) Install ALL dependencies (workspaces handle linking) ----------
# Copy shared source first so build step can compile it
COPY shared/ ./shared/
RUN npm install

# ---------- 3) Copy remaining source code ----------
COPY server/ ./server/
COPY client/ ./client/

# ---------- 4) Create uploads directory ----------
RUN mkdir -p server/uploads

# ---------- 5) Expose ports ----------
# Server (Express)
EXPOSE 3000
# Client (Vite dev server)
EXPOSE 5173

# ---------- 6) Start both client and server ----------
CMD ["npm", "run", "start"]
