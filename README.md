# Monumento Headless (Next + Sanity)

## Requisitos
- Node.js (recomendado 20 LTS; también puede funcionar con 24 LTS)

## 1) Frontend (Next)

1. Copia `.env.example` a `.env` y valida el `projectId`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=935xko7t`
   - `NEXT_PUBLIC_SANITY_DATASET=production`

2. Instala y corre:

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## 2) Studio (Sanity)

```bash
cd studio
npm install
npm run dev
```

Abre `http://localhost:3333`.

## Esquemas incluidos
- `category` (title, slug)
- `product` (title, slug, price, category ref, mainImage)
