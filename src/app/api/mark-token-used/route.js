// pages/api/mark-token-used.js
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";

export async function POST(req) {
    const { token, email } = await req.json();
    await dbConnect();

    try {
        const tokens = await SignupToken.find({ isUsed: false }).exec();
        console.log('Fetched tokens from database:', tokens);
        console.log('Provided token:', token);

        let tokenRecord = null;

        // Perform plain comparison
        for (let rec of tokens) {
            console.log(`Comparing provided token with stored token: ${token} === ${rec.originalToken}`);
            if (token === rec.originalToken) {
                tokenRecord = rec;
                break;
            }
        }

        if (!tokenRecord) {
            console.log('Token not found or already used.');
            return new Response(JSON.stringify({ success: false, message: "Token not found or already used." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Token matched. Marking as used for email:', email);

        tokenRecord.isUsed = true;
        tokenRecord.email = email;
        await tokenRecord.save();

        return new Response(JSON.stringify({ success: true, message: "Token marked as used." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error marking token as used:', error);
        return new Response(JSON.stringify({ success: false, message: "Server error." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
