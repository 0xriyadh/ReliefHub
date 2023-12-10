import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  CampaignForm,
  CampaignsTable,
  DonationItemForm,
  DonationsTable,
  LatestDonations,
  LatestReliefs,
  ModeratorsField,
  ReliefForm,
  ReliefStocksField,
  ReliefsTable,
  StocksTable,
  TeamField,
  TeamsTable,
  UserTable,
} from './definitions';

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

    const numberOfModerators = Number(data[0].rows[0].count ?? '0');
    const numberOfVolunteers = Number(data[1].rows[0].count ?? '0');
    const numberOfCampaigns = Number(data[2].rows[0].count ?? '0');
    const numberOfDonations = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfModerators,
      numberOfVolunteers,
      numberOfCampaigns,
      numberOfDonations,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
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

    console.log('Fetching latest donations ...');

    const latestDonations = data.rows;

    console.log('Data fetch completed after 1 second.');
    return latestDonations;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest donations.');
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

    console.log('Fetching reliefs data...');

    const latestReliefs = data.rows;

    console.log('Data fetch completed after 1 second.');
    return latestReliefs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reliefs.');
  }
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredCampaigns(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
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

    return campaigns.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered campaigns.');
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
            c.status::text ILIKE ${`%${query}%`};`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of campaigns.');
  }
}

export async function fetchCampaignById(id: string) {
  noStore();

  try {
    const data = await sql<CampaignForm>`
        SELECT
            *
        FROM 
            campaigns
        WHERE
            id = ${id};
    `;

    const campaigns = data.rows[0];
    return campaigns;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch campaign with ID.');
  }
}

export async function fetchReliefById(id: string) {
  noStore();

  try {
    const data = await sql<ReliefForm>`
        SELECT
            *
        FROM 
            reliefs
        WHERE
            id = ${id};
    `;

    const relief = data.rows[0];
    return relief;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch relief with ID.');
  }
}

export async function fetchModeratorsWithoutActiveCampaign() {
  noStore();

  try {
    const data = await sql<ModeratorsField>`
      SELECT
          id, 
          name
      FROM 
          users
      WHERE
          role = 'moderator'
          AND id NOT IN (
              SELECT campaign_leader_id FROM campaigns WHERE status = 'active'
          )
      ORDER BY
          name ASC;
    `;

    const moderators = data.rows;
    return moderators;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch moderators without active campaigns.');
  }
}

export async function fetchModeratorsWithoutActiveTeam() {
  noStore();

  try {
    const data = await sql<ModeratorsField>`
      SELECT
          id, 
          name
      FROM 
          users
      WHERE
          role = 'moderator'
          AND id NOT IN (
              SELECT team_leader_id FROM teams WHERE status = 'active'
          )
      ORDER BY
          name ASC;
    `;

    const moderators = data.rows;
    return moderators;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all moderators without active teams.');
  }
}

export async function fetchTeamsWithCampaignId(id: string) {
  noStore();

  try {
    const teams = await sql<TeamField>`
            SELECT * FROM 
                teams
            WHERE
                campaign_id = ${id};
        `;

    return teams.rows;
  } catch (err: any) {
    console.error('Database Error:', err);
    throw new Error(
      `Failed to fetch teams with campaign id ${id}. Error: ${err.message}`,
    );
  }
}

export async function fetchTeamsCountWithCampaignId(id: string) {
  noStore();

  try {
    const count = await sql`
            SELECT COUNT(*) FROM 
                teams
            WHERE
                campaign_id = ${id};
        `;

    return Number(count.rows[0].count);
  } catch (err: any) {
    console.error('Database Error:', err);
    throw new Error(
      `Failed to fetch teams count with campaign id ${id}. Error: ${err.message}`,
    );
  }
}

export async function fetchIfAnyTeamWithCampaignId(id: string) {
  noStore();

  try {
    const result = await sql`
            SELECT EXISTS (
                SELECT 1 FROM teams WHERE campaign_id = ${id}
            ) AS "exists";
        `;

    return result.rows[0].exists;
  } catch (err: any) {
    console.error('Database Error:', err);
    throw new Error(
      `Failed to check if team exists with campaign id ${id}. Error: ${err.message}`,
    );
  }
}

export async function fetchIfAnyStockItemWithCampaignId(id: string) {
  noStore();

  try {
    const result = await sql`
            SELECT EXISTS (
                SELECT 1 FROM campaign_stocks WHERE campaign_id = ${id}
            ) AS "exists";
        `;

    return result.rows[0].exists;
  } catch (err: any) {
    console.error('Database Error:', err);
    throw new Error(
      `Failed to check if stock item exists with campaign id ${id}. Error: ${err.message}`,
    );
  }
}

export async function fetchUserById(id: string) {
  noStore();

  try {
    const data = await sql`
        SELECT
            *
        FROM 
            users
        WHERE
            id = ${id};
    `;

    const user = data.rows[0];
    return user;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user with ID.');
  }
}

export async function fetchFilteredStocks(
  campaign_id: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log('Fetching filtered stocks ...');
    const campaignStocks = await sql<StocksTable>`
            SELECT 
                campaigns.id AS campaign_id,
                donation_items.id AS donation_item_id,
                donation_items.name AS item_name, 
                donation_items.unit AS item_unit, 
                campaign_stocks.quantity AS item_quantity
            FROM 
                campaign_stocks
            JOIN 
                campaigns ON campaign_stocks.campaign_id = campaigns.id
            JOIN 
                donation_items ON campaign_stocks.donation_item_id = donation_items.id
            WHERE
                campaigns.id=${campaign_id}
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

    console.log('Fetching filtered stocks completed after 1 sec. ');
    return campaignStocks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered stocks.');
  }
}

export async function fetchCampaignStocksPages(id: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                campaign_stocks
            JOIN 
                campaigns ON campaign_stocks.campaign_id = campaigns.id
            JOIN 
                donation_items ON campaign_stocks.donation_item_id = donation_items.id
            WHERE
                campaigns.id=${id};
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of campaigns.');
  }
}

export async function fetchDonationItems(campaignId: string) {
  noStore();

  try {
    const data = await sql`
        SELECT 
            donation_items.id,
            donation_items.name,
            donation_items.unit
        FROM 
            donation_items
        WHERE 
            NOT EXISTS (
                SELECT 1 
                FROM campaign_stocks 
                WHERE 
                    campaign_stocks.donation_item_id = donation_items.id 
                    AND campaign_stocks.campaign_id = ${campaignId}
            )
        ORDER BY
            donation_items.name ASC;
        `;

    const donationItems = data.rows as DonationItemForm[];
    return donationItems;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch donation items.');
  }
}

export async function fetchFilteredTeams(
  campaign_id: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log('Fetching filtered teams ...');
    const campaignTeams = await sql<TeamsTable>`
            SELECT 
                teams.id, 
                teams.name, 
                teams.district, 
                teams.status, 
                users.name AS team_leader_name, 
                users.id AS team_leader_id 
            FROM 
                teams 
            JOIN 
                users ON teams.team_leader_id = users.id 
            WHERE 
                teams.campaign_id = ${campaign_id}
            ORDER BY
                teams.name ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

    console.log('Fetching filtered teams completed after 1 sec. ');
    return campaignTeams.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered tems.');
  }
}

export async function fetchTeamsPages(campaign_id: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                teams 
            JOIN 
                users ON teams.team_leader_id = users.id 
            WHERE 
                teams.campaign_id = ${campaign_id};
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of teams.');
  }
}

export async function fetchFilteredReliefs(
  campaign_id: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log('Fetching filtered reliefs ...');
    const campaignTeams = await sql<ReliefsTable>`
            SELECT 
                *
            FROM 
                reliefs 
            WHERE 
                campaign_id = ${campaign_id}
            ORDER BY
                timestamp DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

    console.log('Fetching filtered reliefs completed after 1 sec. ');
    return campaignTeams.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered reliefs.');
  }
}

export async function fetchReliefsPages(campaign_id: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                reliefs 
            WHERE 
                campaign_id = ${campaign_id}
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of pages for reliefs.');
  }
}

export async function fetchFilteredDonations(
  campaign_id: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const donations = await sql<DonationsTable>`
            SELECT 
                t.id,
                t.quantity,
                t.timestamp,
                t.status,
                c.name AS campaign_name,
                u.name AS donor_name,
                di.name AS donation_item_name,
                di.unit AS donation_item_unit
            FROM 
                transactions t
            JOIN 
                campaigns c ON t.campaign_id = c.id
            JOIN 
                users u ON t.donor_id = u.id
            JOIN 
                donation_items di ON t.donation_item_id = di.id
            WHERE
                t.campaign_id = ${campaign_id}
            ORDER BY
                t.timestamp DESC
            LIMIT 
                ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

    return donations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered donations.');
  }
}

export async function fetchDonationsPages(campaign_id: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                transactions t
            JOIN 
                campaigns c ON t.campaign_id = c.id
            JOIN 
                users u ON t.donor_id = u.id
            JOIN 
                donation_items di ON t.donation_item_id = di.id
            WHERE
                t.campaign_id = ${campaign_id};
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of donations.');
  }
}

export async function fetchFilteredUsers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UserTable>`
            SELECT 
                id,
                name,
                email,
                role,
                type
            FROM 
                users
            WHERE
                name ILIKE ${`%${query}%`} OR
                email ILIKE ${`%${query}%`} OR
                role::text ILIKE ${`%${query}%`} OR
                type::text ILIKE ${`%${query}%`}
            ORDER BY
                name ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
        `;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered users.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                users
            WHERE
                name ILIKE ${`%${query}%`} OR
                email ILIKE ${`%${query}%`} OR
                role::text ILIKE ${`%${query}%`} OR
                type::text ILIKE ${`%${query}%`};
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}

export async function fetchReliefStocks(reliefId: string) {
  noStore();

  try {
    const data = await sql<ReliefStocksField>`
        SELECT 
            t.id as transaction_id,
            d.name,
            t.quantity,
            d.unit
        FROM
            transactions t
        JOIN
            reliefs r ON t.relief_id = r.id
        JOIN 
            donation_items d ON t.donation_item_id = d.id
        WHERE r.id = ${reliefId};
      `;

    const reliefStocks = data.rows;
    return reliefStocks;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch relief stocks.');
  }
}
