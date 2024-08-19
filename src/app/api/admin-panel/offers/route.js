import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";
import jwt from "jsonwebtoken";

export async function POST(request) {
    await dbConnect();

    try {
        const { email, password } = await request.json();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return new Response(JSON.stringify({ message: "Invalid email or password." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Invalid email or password." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '72h' });

        return new Response(JSON.stringify({ token, admin: { id: admin._id, name: admin.name, email: admin.email } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('An error occurred while signing in:', error);
        return new Response(JSON.stringify({ message: "An error occurred on the server." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
