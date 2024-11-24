import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { collection, addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "@/lib/firebase";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "defeejd72",
  api_key: "965298443644288",
  api_secret: "SawUdfufUnRMW_AWvBt28vEKkOM",
});

//CLOUDINARY_URL=cloudinary://965298443644288:SawUdfufUnRMW_AWvBt28vEKkOM@defeejd72

// Helper to convert ReadableStream to Base64
// Helper to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const displayName = formData.get("displayName") as string;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    // Convert file to Buffer
    const buffer = await streamToBuffer(file.stream());

    // Upload file to Cloudinary using the Buffer
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: "auto", // Auto-detects file type (image, video, document, etc.)
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Write buffer to the stream
      uploadStream.end(buffer);
    });

    // Save metadata in Firestore
    const fileData = {
      uuid: nanoid(),
      displayName: displayName || (uploadResponse as any).original_filename,
      cloudinaryUrl: (uploadResponse as any).secure_url,
      publicId: (uploadResponse as any).public_id,
    };

    await addDoc(collection(db, "files"), fileData);

    return NextResponse.json({ success: true, file: fileData });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
