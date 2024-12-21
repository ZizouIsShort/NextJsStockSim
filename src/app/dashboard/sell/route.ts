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
        const { stockName, sellDate, sellPrice, quantity } = body;

        // Validate request body
        if (!stockName) {
            return NextResponse.json({ error: "Missing required field: stockName." });
        }

        // Check for an existing stock with the same stockName
        const { data: existingStock, error: selectError } = await supabase
            .from("trades")
            .select("*")
            .eq("stock_name", stockName)
            .single();

        if (selectError && selectError.code !== "PGRST116") {
            // Handle errors other than "row not found"
            console.error("Error fetching stock:", selectError);
            return NextResponse.json({ error: "Failed to check existing stock." });
        }

        if (existingStock) {
            // Stock exists, check if it's eligible for updating sell data
            if (!existingStock.sell_date) {
                // If the sell_date column is empty, update the selling columns
                const parsedSellPrice = parseFloat(sellPrice);
                const parsedSellQuantity = parseFloat(quantity);

                if (isNaN(parsedSellPrice) || isNaN(parsedSellQuantity)) {
                    return NextResponse.json({ error: "Invalid sellPrice or sellQuantity. Both must be valid numbers." });
                }

                const totalSellCost = parsedSellPrice * parsedSellQuantity;

                const { error: updateError } = await supabase
                    .from("trades")
                    .update({
                        sell_date: sellDate,
                        sell_price: parsedSellPrice,
                        sell_quantity: parsedSellQuantity,
                        total_selling_cost: totalSellCost,
                    })
                    .eq("stock_name", stockName);

                if (updateError) {
                    console.error("Error updating stock:", updateError);
                    return NextResponse.json({ error: "Failed to update sell data." });
                }

                return NextResponse.json({ message: "Sell data added successfully." });
            } else {
                // If sell_date is already populated, prevent update
                return NextResponse.json({
                    error: "Stock already has sell data. Cannot overwrite existing sell data.",
                });
            }
        } else {
            console.log('You havent bought the stock that u want to sell')
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "An unexpected error occurred." });
    }
}

export function GET() {
    return NextResponse.json({ error: "GET method not supported on this route. Use POST instead." });
}
