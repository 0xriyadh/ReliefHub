import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { CampaignsTable, LatestDonations, LatestReliefs } from "./definitions";

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
        const data = await sql<LatestDonations>`
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

        console.log("Fetching latest donations ...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const latestDonations = data.rows;

        console.log("Data fetch completed after 1 second.");
        return latestDonations;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest donations.");
    }
}

export async function fetchLatestReliefs() {
    noStore();

    try {
        const data = await sql<LatestReliefs>`
          SELECT 
              r.id,
              r.name AS relief_name,
              r.location AS relief_location,
              c.name AS campaign_name
          FROM 
              reliefs r
          JOIN 
              campaigns c ON r.campaign_id = c.id
          ORDER BY 
              r.timestamp DESC
          LIMIT 5;
        `;

        console.log("Fetching reliefs data...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const latestReliefs = data.rows;

        console.log("Data fetch completed after 1 second.");
        return latestReliefs;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest reliefs.");
    }
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredCampaigns(
    query: string,
    currentPage: number
) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        console.log("Fetching filtered campaigns ...");
        const campaigns = await sql<CampaignsTable>`
        SELECT 
            c.id,
            c.name,
            c.campaign_leader_id,
            u.name AS campaign_leader_name,
            c.status,
            c.timestamp
        FROM 
            campaigns c
        JOIN 
            users u ON c.campaign_leader_id = u.id
        WHERE
            u.name ILIKE ${`%${query}%`} OR
            c.name ILIKE ${`%${query}%`} OR
            c.status::text ILIKE ${`%${query}%`} OR
            c.timestamp::text ILIKE ${`%${query}%`}
        ORDER BY 
            c.timestamp DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};`;
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Fetching filtered campaigns completed after 1 sec. ");
        return campaigns.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch filtered campaigns.");
    }
}

export async function fetchCampaignsPages(query: string) {
    noStore();

    try {
        const count = await sql`SELECT COUNT(*)
        FROM 
            campaigns c
        JOIN 
            users u ON c.campaign_leader_id = u.id
        WHERE
            u.name ILIKE ${`%${query}%`} OR
            c.name ILIKE ${`%${query}%`} OR
            c.status::text ILIKE ${`%${query}%`}`;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / ITEMS_PER_PAGE
        );
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of campaigns.");
    }
}