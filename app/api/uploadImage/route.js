// app/api/upload/route.js

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const config = {
  api: { bodyParser: false },
};

export const POST = async (req) => {

  

  
  try {
    // Parse the incoming form data
    const formData = await req.formData();

    // Extract the file from the form data
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read the file into a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Compute the MD5 hash of the file
    const md5Hash = crypto.createHash('md5').update(fileBuffer).digest('base64');

    // Initialize the S3 client
    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const links =[];

    // Generate a unique file name
    const ext = file.name.split('.').pop();
    const newFileName = `${Date.now()}.${ext}`;

    // Upload the file to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newFileName,
        Body: fileBuffer,
        ContentType: file.type,
        ContentMD5: md5Hash,
        ACL: 'public-read',
      })
    );

    // Generate the public URL of the uploaded file
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
    links.push(fileUrl)
    // Respond with the file URL
    return NextResponse.json({ links});
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Error processing upload' }, { status: 500 });
  }
};
