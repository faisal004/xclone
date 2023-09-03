import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongoose';
import User from '@/models/userschema';
import { NextRequest,NextResponse } from 'next/server';
connectMongoDB()
export async function POST(request:NextRequest){
  try {
    
    const reqBody=await request.json();
    const {email }=reqBody;
    
    const user=await User.findOne({email})
    console.log(user)
  if(user !== null){
    return NextResponse.json({message:"User Exists"})
  }else{
    return NextResponse.json({message:"You can create user"})
  }
   
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


