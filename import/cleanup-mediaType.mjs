import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

const client = createClient({
  projectId: required("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: required("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01",
  token: required("SANITY_API_TOKEN"),
  useCdn: false,
});

async function main() {
  const ids = await client.fetch(
    `*[_type=="menuItem" && defined(mediaType)]._id`,
  );

  console.log(`Docs con mediaType: ${ids.length}`);

  const chunkSize = 50;
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    let tx = client.transaction();
    for (const id of chunk) {
      tx = tx.patch(id, (p) => p.unset(["mediaType"]));
    }
    await tx.commit();
    console.log(
      `Limpieza OK: ${Math.min(i + chunkSize, ids.length)}/${ids.length}`,
    );
  }

  console.log("Listo. mediaType eliminado.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
