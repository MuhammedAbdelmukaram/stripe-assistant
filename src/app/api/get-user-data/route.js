import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";

export const revalidate = 0;
export async function GET() {
    await dbConnect();

    try {

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
