// pages/api/generate-signup-link.js
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";
import { generateToken } from "@/lib/token";
import bcrypt from "bcrypt";

export async function POST(request) {
    await dbConnect();

    try {
        // Generate a signup token
        const originalToken = generateToken();


        // Create token entry in database
        await SignupToken.create({
            originalToken: originalToken, // Store original token
            isUsed: false,
            premium:false,
        });

        // Typically, the link would be sent via email or directly returned here
        const signupLink = `${request.headers.get('origin')}/signup/user?token=${originalToken}`;
        return new Response(JSON.stringify({ signupLink }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('An unexpected error happened:', error);
        return new Response(JSON.stringify({ message: "An error occurred on the server." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
