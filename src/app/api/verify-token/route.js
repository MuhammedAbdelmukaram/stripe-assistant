// app/api/verify-token/page.js

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";

export async function GET(req) {
    await dbConnect();

    let token = req.nextUrl.searchParams.get('token');
    if (!token) {
        console.error('Token is required but not provided');
        return new NextResponse(JSON.stringify({ message: "Token is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    token = token.trim();
    console.log('Checking token:', token);

    try {
        console.log('Fetching token record from the database');
        const tokenRecord = await SignupToken.findOne({ originalToken: token }).exec();

        if (!tokenRecord) {
            console.error('Token record not found in the database');
            return new NextResponse(JSON.stringify({ isValid: false }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Comparing provided token with stored token');

        if (token !== tokenRecord.originalToken) {
            console.error('Token does not match any stored tokens');
            return new NextResponse(JSON.stringify({ isValid: false }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (tokenRecord.isUsed) {
            console.log('Token has already been used');
            return new NextResponse(JSON.stringify({ isValid: false, premium: tokenRecord.premium }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Token is valid and not used');
        return new NextResponse(JSON.stringify({ isValid: true, premium: tokenRecord.premium }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return new NextResponse(JSON.stringify({ message: "An error occurred on the server.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
