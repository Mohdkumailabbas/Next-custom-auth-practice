import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Ensure you have bcrypt installed
//agr fb lgana h to copy paste
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            credentials: {
                //behind the sceme it is creatind a html forn
                email: { label: "email", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            //use can access it using credentials.identifiers.emails/password
            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
              try {
                //  const {email, password} = credentials
                const user = await prisma.user.findFirst({
                    
                    where: {
                        OR: [
                            { email: credentials.email },  // Corrected syntax
                            { username: credentials.email } // Corrected syntax
                        ]
                    }
                });//user find kiya
                 if(!user){
                    throw new Error("User not found");
                 }//agr erro ni h to now we will match the password
                 const isPasswordCorrect =await bcrypt.compare(credentials.password,user.password)
                 if(isPasswordCorrect){
                    return user;
                 }
                 else{
                    throw new Error("Invalid Password");
                 }            
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw new Error("An unexpected error occurred");
                }
            }
        })
        //done with credentials
    ]

}