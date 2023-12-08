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

export async function updateCampaign(id: string, formData: FormData) {
    // Prepare data for insertion into the database
    const { campaignName, leaderId, status } =
        Object.fromEntries(formData.entries()) || {};

    // Insert data into the database
    try {
        await sql`
      UPDATE 
        campaigns
      SET
        name = ${`${campaignName}`}, campaign_leader_id = ${`${leaderId}`}, status = ${`${status}`}
      WHERE
        id = ${id};
    `;
    } catch (error) {
        // If a database error occurs, return a more specific error
        return {
            message: "Database Error: Failed to Update Campaign.",
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/admin/campaigns");
    redirect("/admin/campaigns");
}

export async function deleteCampaign(id: string) {
    console.log(`deleteCampaign function called with id = ${id}`);
    // Delete data from the database
    try {
        try {
            await sql`
                DELETE FROM 
                campaigns
                WHERE
                id = ${id};
            `;
            console.log("SQL deletion statement executed.");
        } catch (sqlError: any) {
            console.error("Error executing SQL deletion statement:", sqlError);
            if (sqlError.code === '23503') {
                throw new Error('This campaign is still referenced by a team and cannot be deleted.');
            } else {
                throw sqlError;
            }
        }
        console.log("Campaign Deleted.");
        revalidatePath("/admin/campaigns");
        return { success: true, message: "Campaign Deleted." };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            error: error.toString(),
        };
    }
}