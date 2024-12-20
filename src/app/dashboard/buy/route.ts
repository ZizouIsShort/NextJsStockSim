import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { stockName, buyDate, buyPrice } = body;

        // Validate request body
        if (!stockName || !buyDate || !buyPrice) {
            return NextResponse.json({ error: "Missing required fields: stockName, buyDate, or buyPrice." });
        }

        // Parse and validate buyPrice
        const parsedBuyPrice = parseFloat(buyPrice);
        if (isNaN(parsedBuyPrice)) {
            return NextResponse.json({ error: "Invalid buyPrice. It must be a valid number." });
        }

        // Insert data into the 'trades' table
        const { data, error } = await supabase
            .from("trades")
            .insert([
                {
                    stock_name: stockName, // Replace with your actual column name in Supabase
                    purchase_date: buyDate, // Ensure date format matches the database (e.g., ISO 8601)
                    purchase_price: parsedBuyPrice,
                },
            ]);

        // Handle Supabase errors
        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Failed to save trade data." });
        }

        // Success response
        return NextResponse.json({ message: "Trade saved successfully", data });
    } catch (error) {
        console.error("Unexpected error saving trade:", error);
        return NextResponse.json({ error: "An unexpected error occurred while saving the trade." });
    }
}

export function GET() {
    return NextResponse.json({ error: "GET method not supported on this route. Use POST instead." });
}
