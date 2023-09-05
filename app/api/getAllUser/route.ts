
import { connectMongoDB } from '@/lib/mongoose';
import User from '@/models/userschema';
import { NextRequest,NextResponse } from 'next/server';


connectMongoDB()

export async function GET(request:NextRequest){
  
  try {
 
    
    const userDetails =  await  User.find({})
  
    console.log(userDetails)
    return NextResponse.json({userDetails})
  } catch (error:any) {
    return NextResponse.json({error:error.message})
  }
}


