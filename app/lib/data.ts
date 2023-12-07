import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

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
