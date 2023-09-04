
import { connectMongoDB } from '@/lib/mongoose';
import Post from '@/models/postSchema';
import { NextRequest,NextResponse } from 'next/server';


connectMongoDB()

export async function POST(request:NextRequest){
  
  try {
 
    const reqBody=await request.json();
    const {tweet,userName,userEmail,userPhoto}=reqBody;
    const newTweet =  new Post({tweet,userName,userEmail,userPhoto })
    await newTweet.save()
    console.log(newTweet)
    return NextResponse.json({message:"Success"})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


