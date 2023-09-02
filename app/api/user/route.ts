import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongoose';
import User from '@/models/userschema';
import { NextRequest,NextResponse } from 'next/server';

export async function POST(request:NextRequest){
  try {
    await connectMongoDB()
    const reqBody=await request.json();
    const {name,email}=reqBody;
    const newUser =  new User({name,email})
    await newUser.save()
    console.log(newUser)
    return NextResponse.json({message:"Success"})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


