import { NextResponse } from "next/server";

export async function POST(){
    try {
        const response =NextResponse.json({
            message:"logout successfully",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0), 
        })
        return response;
    } catch (error) {
        console.log("logout error:",error);
        return NextResponse.json({
            error: "An error occurred",
            statusCode: 500,
        })
    }
}