"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCampaign(formData: FormData) {
    // Prepare data for insertion into the database
    const { campaignName, leaderId } =
        Object.fromEntries(formData.entries()) || {};

    // Insert data into the database
    try {
        await sql`
      INSERT INTO campaigns (name, campaign_leader_id)
      VALUES (${`${campaignName}`}, ${`${leaderId}`});
    `;
    } catch (error) {
        // If a database error occurs, return a more specific error
        return {
            message: "Database Error: Failed to Create Campaign.",
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/admin/campaigns");
    redirect("/admin/campaigns");
}
