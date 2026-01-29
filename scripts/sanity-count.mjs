import "dotenv/config";
import { createClient } from "@sanity/client";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carga .env.local desde la raíz del repo
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET in .env.local");

const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

const q = `{
  "count": count(*[_type=="menuItem"]),
  "sample": *[_type=="menuItem"][0..4]{_id,title,section,isActive}
}`;

const res = await client.fetch(q);
console.log(JSON.stringify(res, null, 2));
