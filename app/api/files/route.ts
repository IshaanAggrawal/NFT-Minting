import { NextResponse } from "next/server";
import { pinata } from "@/lib/pinata";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Pinata using the correct method
    const upload = await pinata.upload
      .stream(
        Buffer.from(await file.arrayBuffer()),
        {
          filename: file.name,
        }
      );

    // Construct the URL
    const cid = upload.IpfsHash;
    const gateway = process.env.NEXT_PUBLIC_GATEWAY_URL || "https://gateway.pinata.cloud/ipfs/";
    const fileUrl = `${gateway}${cid}`;

    console.log("✅ Uploaded to IPFS:", fileUrl);

    return NextResponse.json({ cid, fileUrl, url: fileUrl });
  } catch (error: any) {
    console.error("❌ Upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';