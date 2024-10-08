// import prisma from '@prisma/client'
import prisma from '../../../../prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {z} from 'zod'
import bcrypt from "bcrypt"

const createIssueSchema = z.object({
    username:z.string().min(2).max(20),
    password:z.string().min(7).max(20),
    email:z.string().email(),
})
export async function POST (req:NextRequest){
    const body= await req.json()
    const validation= createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({
            error:"validation error check data inputs",
            issues: validation.error.format(), 
            status:400
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(body.password,10)
        const newUser = await prisma.user.create({
          data: {
            email: body.email,
            username: body.username,
            password: hashedPassword,
          }
        });
        
        return NextResponse.json({
          message: "User created successfully",
          newUser,
          status: 201
        });
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({
          error: "Error creating user", // Added error handling for user creation
          status: 500
        });
      }

}


