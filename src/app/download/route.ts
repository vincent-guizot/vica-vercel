import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const url = searchParams.get("url");

  console.log("DOWNLOAD URL:", url);

  if (!url) {
    return Response.json(
      {
        message: "Download URL required",
      },
      {
        status: 400,
      },
    );
  }

  const response = await fetch(url);

  if (!response.ok) {
    return Response.json(
      {
        message: "Failed to download file",
      },
      {
        status: 500,
      },
    );
  }

  const fileName = decodeURIComponent(url.split("/").pop() || "download");

  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        response.headers.get("content-type") || "application/octet-stream",

      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
