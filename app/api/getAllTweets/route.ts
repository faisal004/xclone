
import { connectMongoDB } from '@/lib/mongoose';
import Post from '@/models/postSchema';
import { NextRequest, NextResponse } from 'next/server';


connectMongoDB()

export async function GET(request: NextRequest) {

    try {
        const allTweet = await Post.find({})


        return NextResponse.json({ allTweet })
    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}


