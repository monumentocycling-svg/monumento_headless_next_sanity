import { sanityClient } from "@/lib/sanityClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
  };

  const q = `{
    "items": count(*[_type=="menuItem" && (isActive != false)]),
    "sample": *[_type=="menuItem" && (isActive != false)][0..2]{_id,title,section}
  }`;

  const data = await sanityClient.fetch(q, {}, { cache: "no-store" });

  return Response.json({ env, data }, { headers: { "Cache-Control": "no-store" } });
}
