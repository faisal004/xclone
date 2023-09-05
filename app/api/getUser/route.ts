
import { connectMongoDB } from '@/lib/mongoose';
import User from '@/models/userschema';
import { NextRequest,NextResponse } from 'next/server';


connectMongoDB()

export async function POST(request:NextRequest){
  
  try {
 
    const reqBody=await request.json();
    const {email}=reqBody;
    const userDetails =  await  User.findOne({email})
  
    console.log(userDetails)
    return NextResponse.json({userDetails})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


