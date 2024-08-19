// pages/api/users.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";

export async function GET(request) {
    await dbConnect();

    try {
        const users = await User.find({});
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch users", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
