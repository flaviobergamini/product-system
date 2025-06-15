# -------- Etapa 1: Build das aplicações (Turborepo) --------
FROM node:20.14 AS builder

WORKDIR /app

# Copia tudo
COPY . .

# Instala Turbo e dependências
RUN npm install -g turbo
RUN npm install

# Builda os apps (NestJS + React)
RUN turbo run build --filter=api... --filter=web...

# -------- Etapa 2: Criação da imagem final de produção --------
FROM node:20.14

WORKDIR /app

# Copia os arquivos construídos
COPY --from=builder /app .

# Instala apenas dependências de produção do backend
RUN cd apps/api && npm install --omit=dev

# Instala dependências de preview do frontend
RUN cd apps/web && npm install

# Instala `serve` para servir frontend em produção
RUN npm install -g serve

# Instala concurrently para rodar ambos
RUN npm install -g concurrently

# Expõe as portas do NestJS e Vite
EXPOSE 3000 5173

# Inicia API (NestJS) + Frontend (Vite Preview)
CMD concurrently \
  "npm run --prefix apps/api start:prod" \
  "serve -s apps/web/dist -l 5173"
