import dbConnect from "@/lib/dbConnect";
import Offer from "@/models/offer";

// POST: Add a new offer
export async function POST(request) {
    await dbConnect();

    try {
        const { name, description, userPercent, users, purchases, amount, imageUrl } = await request.json();

        const newOffer = new Offer({
            name,
            description,
            userPercent,
            users,
            purchases,
            amount,
            imageUrl
        });

        await newOffer.save();

        return new Response(JSON.stringify(newOffer), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error adding offer:', error);
        return new Response(JSON.stringify({ message: "An error occurred while adding the offer." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// PUT: Update an existing offer
export async function PUT(request) {
    await dbConnect();

    try {
        const { id, name, description, userPercent, users, purchases, amount, imageUrl } = await request.json();

        const updatedOffer = await Offer.findByIdAndUpdate(
            id,
            { name, description, userPercent, users, purchases, amount, imageUrl },
            { new: true }
        );

        if (!updatedOffer) {
            return new Response(JSON.stringify({ message: "Offer not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(updatedOffer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating offer:', error);
        return new Response(JSON.stringify({ message: "An error occurred while updating the offer." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// GET: Fetch all offers
export async function GET(request) {
    await dbConnect();

    try {
        const offers = await Offer.find({});
        return new Response(JSON.stringify(offers), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching offers:', error);
        return new Response(JSON.stringify({ message: "An error occurred while fetching the offers." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
