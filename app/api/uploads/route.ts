import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        console.log('Upload API called');

        const formData = await request.formData();
        const file = formData.get('file') as File;

        console.log('File received:', file);

        if (!file) {
            console.log('No file provided');
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        console.log('File details:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Check environment variables
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
            console.error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
            return NextResponse.json(
                { error: 'Cloudinary cloud name not configured' },
                { status: 500 }
            );
        }

        if (!process.env.CLOUDINARY_API_KEY) {
            console.error('Missing CLOUDINARY_API_KEY');
            return NextResponse.json(
                { error: 'Cloudinary API key not configured' },
                { status: 500 }
            );
        }

        if (!process.env.CLOUDINARY_API_SECRET) {
            console.error('Missing CLOUDINARY_API_SECRET');
            return NextResponse.json(
                { error: 'Cloudinary API secret not configured' },
                { status: 500 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        console.log('Uploading to Cloudinary...');

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'nextjs-uploads',
            resource_type: 'auto',
        });

        console.log('Upload successful:', result.secure_url);

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
        });

    } catch (error: any) {
        console.error('Upload error:', error);
        console.error('Error stack:', error.stack);

        return NextResponse.json(
            {
                error: error.message || 'Upload failed',
                details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
            },
            { status: 500 }
        );
    }
}