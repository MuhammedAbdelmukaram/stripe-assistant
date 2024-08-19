// pages/api/users.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(request) {
    await dbConnect();

    try {
        // Fetch the total count of users
        const totalUsers = await User.countDocuments({});

        // Prepare the response data
        const responseData = {
            totalUsers,
        };

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch user count", error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
