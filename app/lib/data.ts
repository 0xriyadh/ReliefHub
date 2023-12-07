import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { LatestDonation } from "./definitions";

export async function fetchCardData() {
    noStore();

    try {
        const moderatorsCountPromise = sql`SELECT COUNT(*) FROM users WHERE role = 'moderator'`;
        const volunteersCountPromise = sql`SELECT COUNT(*) FROM users WHERE role = 'volunteer'`;
        const campaignsCountPromise = sql`SELECT COUNT(*) FROM campaigns`;
        const donationsCountPromise = sql`SELECT COUNT(*) FROM transactions WHERE donor_id IS NOT NULL;`;

        const data = await Promise.all([
            moderatorsCountPromise,
            volunteersCountPromise,
            campaignsCountPromise,
            donationsCountPromise,
        ]);

        const numberOfModerators = Number(data[0].rows[0].count ?? "0");
        const numberOfVolunteers = Number(data[1].rows[0].count ?? "0");
        const numberOfCampaigns = Number(data[2].rows[0].count ?? "0");
        const numberOfDonations = Number(data[3].rows[0].count ?? "0");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            numberOfModerators,
            numberOfVolunteers,
            numberOfCampaigns,
            numberOfDonations,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch card data.");
    }
}

export async function fetchLatestDonations() {
    noStore();

    try {
        const data = await sql<LatestDonation>`
          SELECT 
              t.id,
              di.name AS donation_item_name,
              di.unit AS donation_item_unit,
              t.quantity,
              dn.name AS donor_name,
              c.name AS campaign_name
          FROM 
              transactions t
          JOIN 
              users dn ON t.donor_id = dn.id
          JOIN 
              donation_items di ON t.donation_item_id = di.id
          JOIN 
              campaigns c ON t.campaign_id = c.id
          WHERE 
              t.donor_id IS NOT NULL
          ORDER BY 
              t.timestamp DESC
          LIMIT 5;
        `;

        console.log("Fetching revenue data...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const latestDonations = data.rows.map((donation) => ({
            ...donation,
        }));

        console.log("Data fetch completed after 2 seconds.");
        return latestDonations;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest donations.");
    }
}
