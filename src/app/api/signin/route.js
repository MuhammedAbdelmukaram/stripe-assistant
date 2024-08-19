import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";

export async function POST(request) {
    await dbConnect();

    try {
        const data = await request.json();
        const { email, password } = data;

        const user = await UserProfile.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id,plan: user.Plan,  },
            process.env.JWT_SECRET, // Ensure this is set
            { expiresIn: "12h" }
        );

        // Correctly include the token and userId in the response
        return NextResponse.json({ token,plan: user.Plan, userId: user._id.toString() }); // Include userId in the response
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
