import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// The PrismaClient is the primary way to interact with your database in a Node.js/Next.js environment when using Prisma. Once instantiated, it allows you to perform database queries (e.g., creating users, retrieving records, updating data, etc.).
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
    const body =await  request.json()
    const { email, password } = body;
    if (!email || !password) {
        return NextResponse.json({
            error: "Email and password are required",
            statusCode: 400,
        });
    }

    // validate email and password here
    try {
        //check if user exists?
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!user) {
            return NextResponse.json({
                error: "invalid email or password",
                statusCode: 401,
            })
        }
        // 2. Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                error: "invalid email or password",
                statusCode: 401,
            })
        }
        // 3. Generate a JWT token
         const tokenData={
            id:user.id,
            username:user.username
         }
         const jwtSecret=process.env.JWT_SECRET;
         if(!jwtSecret){
            throw new Error("Invalid jwt token")
         }
         const token = await jwt.sign(tokenData,jwtSecret)
         const response = NextResponse.json({
            statusCode: 200,
         })
         //cokkies
          // token naam se token bhej diya
         response.cookies.set("token",token,{
            httpOnly: true,
            
         })
         return response;

    } catch (error) {
        console.log("login error:",error);
      return NextResponse.json({
        error: "an error occurred",
        statusCode: 500,
      })
    }
}