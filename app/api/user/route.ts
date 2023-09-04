import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongoose';
import User from '@/models/userschema';
import { NextRequest,NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/lib/jwt';
connectMongoDB()
export async function POST(request:NextRequest){
  try {
    
    const reqBody=await request.json();
    const {name,email,image,password }=reqBody;
    const newUser =  new User({name,email,image,password})
    await newUser.save()
    const accessToken=signJwtAccessToken({newUser})
    console.log(newUser)
    console.log(accessToken)
    return NextResponse.json({message:accessToken})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


