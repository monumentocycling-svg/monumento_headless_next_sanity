import { sanityClient } from "@/lib/sanityClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const q = `{
    "items": count(*[_type=="menuItem" && (isActive != false)]),
    "sample": *[_type=="menuItem" && (isActive != false)][0..2]{
      _id, title, section, isActive
    }
  }`;

  const data = await sanityClient.fetch(q, {}, { cache: "no-store" });
  return Response.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
