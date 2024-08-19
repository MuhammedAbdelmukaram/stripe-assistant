import dbConnect from "@/lib/dbConnect";
import user from "@/models/user";

export async function POST(request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        // Check if username or email already exists
        const existingUser = await user.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            if (existingUser.username === username) {
                return new Response(JSON.stringify({ message: "Username already exists" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            if (existingUser.email === email) {
                return new Response(JSON.stringify({ message: "Email already exists" }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // Create new user
        const newUser = new user({ username, email, password });
        await newUser.save();

        return new Response(JSON.stringify({ message: "User registered successfully" }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return new Response(JSON.stringify({ message: "An error occurred during registration" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
