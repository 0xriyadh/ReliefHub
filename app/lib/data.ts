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
  RecipientReliefField,
  ReliefDistributionTable,
  ReliefForm,
  ReliefRecipientForDistribution,
  ReliefStocksField,
  ReliefsTable,
  StocksTable,
  TeamField,
  TeamForm,
  TeamsTable,
  User,
  UserTable,
  VolunteerField,
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
    const data = await sql<User>`
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

export async function fetchCampaignStocks(campaign_id: string) {
  noStore();

  try {
    console.log('Fetching campaign stocks ...');
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
        `;

    console.log('Fetching campaign stocks completed after 1 sec. ');
    return campaignStocks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign stocks.');
  }
}

export async function fetchDonationItemsFromCampaignStocksNotInReliefStocks(
  campaignId: string,
  reliefId: string,
) {
  noStore();

  try {
    const data = await sql<StocksTable>`
        SELECT
            c.id AS campaign_id,
            di.id AS donation_item_id,
            di.name AS item_name, 
            di.unit AS item_unit, 
            cs.quantity AS item_quantity
        FROM
            campaign_stocks cs
        JOIN 
            campaigns c ON cs.campaign_id = c.id
        JOIN 
            donation_items di ON cs.donation_item_id = di.id
        WHERE
            c.id=${campaignId}
        AND di.id NOT IN
            (SELECT
                t.donation_item_id
            FROM 
                transactions t
            WHERE
                t.relief_id = ${reliefId})
        ORDER BY
            di.name ASC;
      `;

    const donationItems = data.rows;
    return donationItems;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch donation items not in relief stocks.');
  }
}

export async function fetchDonationItemsByCampaignId(campaignId: string) {
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

export async function fetchDonationItems() {
  noStore();

  try {
    const data = await sql<DonationItemForm>`
        SELECT 
            *
        FROM 
            donation_items
        ORDER BY
            name ASC;
        `;

    const donationItems = data.rows;
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
            d.id as item_id,
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

export async function fetchReliefDistribution(
  reliefId: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<ReliefDistributionTable>`
        SELECT 
            rrr.relief_id,
            u.name as recipient_name,
            di.name as item_name,
            di.unit as item_unit,
            rrr.quantity as quantity,
            rrr.timestamp
            
        FROM 
            recipient_receive_relief rrr
        JOIN
            users u ON rrr.recipient_id = u.id
        JOIN
            donation_items di ON rrr.donation_item_id = di.id
        WHERE 
            rrr.relief_id = ${reliefId}
        ORDER BY
            rrr.timestamp DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
      `;

    const reliefDistribution = data.rows;
    return reliefDistribution;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch relief distribution.');
  }
}

export async function fetchReliefDistributionPages(reliefId: string) {
  noStore();

  try {
    const count = await sql`
            SELECT 
                COUNT(*)
            FROM 
                recipient_receive_relief rrr
            JOIN
                users u ON rrr.recipient_id = u.id
            JOIN
                donation_items di ON rrr.donation_item_id = di.id
            WHERE 
                rrr.relief_id = ${reliefId};
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of relief distribution.');
  }
}

export async function fetchRecipientsForDistribution(reliefId: string) {
  noStore();

  try {
    const data = await sql<ReliefRecipientForDistribution>`
      SELECT 
          u.id,
          u.name
      FROM 
          users u
      WHERE
          u.type = 'recipient' 
          AND u.id NOT IN (
              SELECT 
                  recipient_id 
              FROM 
                  recipient_receive_relief 
              WHERE 
                  relief_id = 'cea7d7a5-8629-4867-8404-2fda94e2c45e'
          )
      ORDER BY
          u.name ASC;
      `;

    const recipients = data.rows;
    return recipients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch recipients for distribution.');
  }
}

export async function fetchReliefTeams(reliefId: string) {
  noStore();
  try {
    const data = await sql<TeamsTable>`
        SELECT
            t.id,
            t.name,
            t.district,
            t.status,
            u.name AS team_leader_name,
            u.id AS team_leader_id
        FROM 
            teams t
        JOIN 
            users u ON t.team_leader_id = u.id
        WHERE
            t.id IN (
                SELECT team_id FROM team_works_with_relief WHERE relief_id = ${reliefId}
            );
    `;

    const teams = data.rows;
    return teams;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch teams working with relief.');
  }
}

export async function fetchTeamsToAssignToRelief(
  campaign_id: string,
  reliefId: string,
) {
  noStore();
  try {
    const data = await sql<TeamForm>`
      SELECT 
          t.id,
          t.name
      FROM 
          teams t
      LEFT JOIN 
          team_works_with_relief twr ON t.id = twr.team_id AND twr.relief_id = ${reliefId}
      WHERE 
          t.campaign_id = ${campaign_id} AND twr.team_id IS NULL AND t.status = 'active';
    `;

    const teams = data.rows;
    return teams;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch teams to assign to relief.');
  }
}

export async function fetchTeamById(id: string) {
  noStore();

  try {
    const data = await sql<TeamField>`
        SELECT
            t.id,
            t.name,
            t.district,
            t.status,
            u.name AS team_leader_name,
            u.id AS team_leader_id,
            t.campaign_id
        FROM 
            teams t
        JOIN
            users u ON t.team_leader_id = u.id
        WHERE
            t.id = ${id};
    `;

    const team = data.rows[0];
    return team;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch team with ID.');
  }
}

export async function fetchVolunteersByTeamId(id: string) {
  noStore();

  try {
    const data = await sql<VolunteerField>`
      SELECT 
          u.id,
          u.name,
          u.email,
          u.phone
      FROM
          volunteers_works_or_worked_in vw
      JOIN 
          users u ON u.id = vw.volunteer_id
      WHERE
          vw.team_id=${id} and u.role = 'volunteer';
    `;

    const volunteers = data.rows;
    return volunteers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch volunteers by team id.');
  }
}

// these volunteers might have worked in some archived teams before but currently not working in any active team
export async function fetchAvailableVolunteers() {
  noStore();

  try {
    const data = await sql<VolunteerField>`
      SELECT
          u.id,
          u.name,
          u.email,
          u.phone
      FROM
          users u
      WHERE
          u.id NOT IN (
              SELECT 
                  u.id
              FROM
                  volunteers_works_or_worked_in vw
              JOIN 
                  users u ON u.id = vw.volunteer_id
              JOIN
                  teams t ON t.id = vw.team_id
              WHERE 
                  u.role = 'volunteer' AND t.status = 'active'
          ) 
          AND 
            u.role = 'volunteer';
    `;

    const volunteers = data.rows;
    return volunteers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch available volunteers.');
  }
}

export async function fetchUser(email: string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchLatestDonationsByDonorId(donorId: string) {
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
              t.donor_id = ${donorId}
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

export async function fetchActiveCampaigns() {
  noStore();

  try {
    const data = await sql<CampaignsTable>`
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
              c.status = 'active'
          ORDER BY 
              c.timestamp DESC;
        `;

    console.log('Fetching active campaigns ...');

    const activeCampaigns = data.rows;

    console.log('Data fetch completed after 1 second.');
    return activeCampaigns;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active campaigns.');
  }
}

export async function fetchRecipientReceiveReliefsById(recipientId: string) {
  noStore();

  try {
    const data = await sql<RecipientReliefField>`
          SELECT 
              rrr.relief_id,
              r.name AS relief_name,
              u.name AS recipient_name,
              di.name AS item_name,
              di.unit AS item_unit,
              rrr.quantity,
              rrr.timestamp
          FROM 
              recipient_receive_relief rrr
          JOIN
              donation_items di ON di.id = rrr.donation_item_id
          JOIN
              users u ON rrr.recipient_id = u.id
          JOIN
              reliefs r ON r.id = rrr.relief_id
          WHERE 
              rrr.recipient_id = ${recipientId}
          ORDER BY
              rrr.timestamp DESC
          LIMIT 5;
      `;

    const recipientReceiveReliefs = data.rows;
    return recipientReceiveReliefs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch recipient receive reliefs by id.');
  }
}