FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "i=0; until npx prisma migrate deploy; do i=$((i+1)); if [ \"$i\" -gt 15 ]; then echo 'No se pudo migrar'; exit 1; fi; echo 'Esperando PostgreSQL...'; sleep 3; done; node prisma/seed.mjs && exec npx next start -H 0.0.0.0 -p 3000"]
