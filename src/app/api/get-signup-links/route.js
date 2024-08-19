import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";
export const revalidate = 0;
export async function GET() {
    await dbConnect();

    try {
        const tokens = await SignupToken.find({});
        const response = NextResponse.json({ success: true, tokens });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
