
import { connectMongoDB } from '@/lib/mongoose';
import Post from '@/models/postSchema';
import { NextRequest,NextResponse } from 'next/server';


connectMongoDB()

export async function POST(request:NextRequest){
  
  try {
 
    const reqBody=await request.json();
    const {userEmail}=reqBody;
    const userTweets =  await  Post.find({userEmail})
  
    console.log(userTweets)
    return NextResponse.json({userTweets})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


