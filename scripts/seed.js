const { db } = require("@vercel/postgres");
const { users, teams, campaigns, volunteersWorksOrWorkedIn, donationItems, campaignStocks, reliefs, reliefRecipients, recipientReceiveRelief, teamWorksWithRelief, transactions } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
            DROP TYPE user_role;
          END IF;
        END $$;
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
            DROP TYPE user_type;
          END IF;
        END $$;
        CREATE TYPE member_role AS ENUM ('president', 'moderator', 'volunteer');
        CREATE TYPE user_type AS ENUM ('donor', 'recipient');
          CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            address TEXT NOT NULL,
            role member_role,
            type user_type NOT NULL,
            password TEXT NOT NULL
          );
        `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (id, name, phone, email, address, role, type, password)
        VALUES (${user.id}, ${user.name}, ${user.phone}, ${user.email}, ${user.address}, ${user.role}, ${user.type},${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
            })
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}
async function seedCampaigns(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "campaigns" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS campaigns (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            campaign_leader_id UUID NOT NULL,
            FOREIGN KEY (campaign_leader_id) REFERENCES users(id)
          );
        `;

        console.log(`Created "campaigns" table`);

        // Insert data into the "teams" table
        const insertedCampaigns = await Promise.all(
            campaigns.map(async (campaign) => {
                return client.sql`
                    INSERT INTO campaigns (id, name, campaign_leader_id)
                    VALUES (${campaign.id}, ${campaign.name}, ${campaign.campaign_leader_id})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedCampaigns.length} campaigns`);

        return {
            createTable,
            campaigns: insertedCampaigns,
        };
    } catch (error) {
        console.error("Error seeding campaigns:", error);
        throw error;
    }
}

async function seedTeams(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "teams" table if it doesn't exist
        const createTable = await client.sql`
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'team_status') THEN
            DROP TYPE team_status;
          END IF;
        END $$;
        CREATE TYPE team_status AS ENUM ('active', 'archived');
          CREATE TABLE IF NOT EXISTS teams (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            district VARCHAR(150) NOT NULL,
            status team_status NOT NULL,
            team_leader_id UUID NOT NULL,
            campaign_id UUID NOT NULL,
            FOREIGN KEY (team_leader_id) REFERENCES users(id),
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
          );
        `;

        console.log(`Created "teams" table`);

        // Insert data into the "teams" table
        const insertedTeams = await Promise.all(
            teams.map(async (team) => {
                return client.sql`
                    INSERT INTO teams (id, name, district, status, team_leader_id, campaign_id)
                    VALUES (${team.id}, ${team.name}, ${team.district}, ${team.status}, ${team.team_leader_id}, ${team.campaign_id})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedTeams.length} teams`);

        return {
            createTable,
            teams: insertedTeams,
        };
    } catch (error) {
        console.error("Error seeding teams:", error);
        throw error;
    }
}

async function seedVolunteersWorksOrWorkedIn(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "volunteers_works_or_worked_in" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS volunteers_works_or_worked_in (
            volunteer_id UUID NOT NULL,
            team_id UUID NOT NULL,
            FOREIGN KEY (volunteer_id) REFERENCES users(id),
            FOREIGN KEY (team_id) REFERENCES teams(id),
            PRIMARY KEY (volunteer_id, team_id)
          );
        `;

        console.log(`Created "volunteers_works_or_worked_in" table`);

        // Insert data into the "volunteers_works_or_worked_in" table
        const insertedVolunteersWorksOrWorkedIn = await Promise.all(
            volunteersWorksOrWorkedIn.map(async (temp) => {
                return client.sql`
                    INSERT INTO volunteers_works_or_worked_in (volunteer_id, team_id)
                    VALUES (${temp.volunteer_id}, ${temp.team_id})
                    ON CONFLICT (volunteer_id, team_id) DO NOTHING;
                `;
            })
        );

        console.log(
            `Seeded ${insertedVolunteersWorksOrWorkedIn.length} volunteers_works_or_worked_in`
        );

        return {
            createTable,
            volunteersWorksOrWorkedIn: insertedVolunteersWorksOrWorkedIn,
        };
    } catch (error) {
        console.error("Error seeding volunteers_works_or_worked_in:", error);
        throw error;
    }
}

async function seedReliefs(client) { 
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "reliefs" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS reliefs (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            location VARCHAR(150) NOT NULL,
            campaign_id UUID NOT NULL,
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
          );
        `;

        console.log(`Created "reliefs" table`);

        // Insert data into the "reliefs" table
        const insertedReliefs = await Promise.all(
            reliefs.map(async (relief) => {
                return client.sql`
                    INSERT INTO reliefs (id, name, location, campaign_id)
                    VALUES (${relief.id}, ${relief.name}, ${relief.location}, ${relief.campaign_id})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedReliefs.length} reliefs`);

        return {
            createTable,
            reliefs: insertedReliefs,
        };
    } catch (error) {
        console.error("Error seeding reliefs:", error);
        throw error;
    }
}

async function seedDonationItems(client) { 
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "donationItems" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS donation_items (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            unit VARCHAR(150) NOT NULL
          );
        `;

        console.log(`Created "donation_items" table`);

        // Insert data into the "donation_items" table
        const insertedDonationItems = await Promise.all(
            donationItems.map(async (item) => {
                return client.sql`
                    INSERT INTO donation_items (id, name, unit)
                    VALUES (${item.id}, ${item.name}, ${item.unit})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedDonationItems.length} donation_items`);

        return {
            createTable,
            donationItems: insertedDonationItems,
        };
    } catch (error) {
        console.error("Error seeding donation_items:", error);
        throw error;
    }
}

async function seedCampaignStocks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "campaignStocks" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS campaign_stocks (
            campaign_id UUID NOT NULL,
            donation_item_id UUID NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
            FOREIGN KEY (donation_item_id) REFERENCES donation_items(id),
            PRIMARY KEY (campaign_id, donation_item_id)
          );
        `;

        console.log(`Created "campaign_stocks" table`);

        // Insert data into the "campaign_stocks" table
        const insertedCampaignStocks = await Promise.all(
            campaignStocks.map(async (stock) => {
                return client.sql`
                    INSERT INTO campaign_stocks (campaign_id, donation_item_id)
                    VALUES (${stock.campaign_id}, ${stock.donation_item_id})
                    ON CONFLICT (campaign_id, donation_item_id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedCampaignStocks.length} campaign_stocks`);

        return {
            createTable,
            campaignStocks: insertedCampaignStocks,
        };
    } catch (error) {
        console.error("Error seeding campaign_stocks:", error);
        throw error;
    }    
}

async function seedRecipientReceiveRelief(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "recipient_receive_relief" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS recipient_receive_relief (
            relief_id UUID NOT NULL,
            recipient_id UUID NOT NULL,
            donation_item_id UUID NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (relief_id) REFERENCES reliefs(id),
            FOREIGN KEY (recipient_id) REFERENCES users(id),
            FOREIGN KEY (donation_item_id) REFERENCES donation_items(id),
            PRIMARY KEY (relief_id, recipient_id)
          );
        `;

        console.log(`Created "recipient_receive_relief" table`);

        // Insert data into the "recipient_receive_relief" table
        const insertedRecipientReceiveRelief = await Promise.all(
            recipientReceiveRelief.map(async (temp) => {
                return client.sql`
                    INSERT INTO recipient_receive_relief (relief_id, recipient_id, donation_item_id, quantity)
                    VALUES (${temp.relief_id}, ${temp.recipient_id}, ${temp.donation_item_id}, ${temp.quantity})
                    ON CONFLICT (relief_id, recipient_id) DO NOTHING;
                `;
            })
        );

        console.log(
            `Seeded ${insertedRecipientReceiveRelief.length} recipient_receive_relief`
        );

        return {
            createTable,
            recipientReceiveRelief: insertedRecipientReceiveRelief,
        };
    } catch (error) {
        console.error("Error seeding relief_recipients:", error);
        throw error;
    }
}

async function seedTeamWorksWithRelief(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "team_works_with_relief" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS team_works_with_relief (
            team_id UUID NOT NULL,
            relief_id UUID NOT NULL,
            FOREIGN KEY (team_id) REFERENCES teams(id),
            FOREIGN KEY (relief_id) REFERENCES reliefs(id),
            PRIMARY KEY (team_id, relief_id)
          );
        `;

        console.log(`Created "team_works_with_relief" table`);

        // Insert data into the "team_works_with_relief" table
        const insertedTeamWorksWithRelief = await Promise.all(
            teamWorksWithRelief.map(async (temp) => {
                return client.sql`
                    INSERT INTO team_works_with_relief (team_id, relief_id)
                    VALUES (${temp.team_id}, ${temp.relief_id})
                    ON CONFLICT (team_id, relief_id) DO NOTHING;
                `;
            })
        );

        console.log(
            `Seeded ${insertedTeamWorksWithRelief.length} team_works_with_relief`
        );

        return {
            createTable,
            teamWorksWithRelief: insertedTeamWorksWithRelief,
        };
    } catch (error) {
        console.error("Error seeding team_works_with_relief:", error);
        throw error;
    }
}

async function seedTransactions(client) { 
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "transactions" table if it doesn't exist
        const createTable = await client.sql`
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
            DROP TYPE status;
          END IF;
        END $$;
        CREATE TYPE status AS ENUM ('pending', 'accepted', 'received', 'distributed');
          CREATE TABLE IF NOT EXISTS transactions (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            donation_item_id UUID NOT NULL,
            quantity INTEGER NOT NULL,
            status status NOT NULL DEFAULT 'pending',
            relief_id UUID,
            campaign_id UUID NOT NULL,
            donor_id UUID,
            
            FOREIGN KEY (donation_item_id) REFERENCES donation_items(id),
            FOREIGN KEY (relief_id) REFERENCES reliefs(id),
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
            FOREIGN KEY (donor_id) REFERENCES users(id)
          );
        `;

        console.log(`Created "transactions" table`);

        // Insert data into the "transactions" table
        const insertedTransactions = await Promise.all(
            transactions.map(async (transaction) => {
                return client.sql`
                    INSERT INTO transactions (id, donation_item_id, quantity, status, relief_id, campaign_id, donor_id)
                    VALUES (${transaction.id}, ${transaction.donation_item_id}, ${transaction.quantity}, ${transaction.status}, ${transaction.relief_id}, ${transaction.campaign_id}, ${transaction.donor_id})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedTransactions.length} transactions`);

        return {
            createTable,
            transactions: insertedTransactions,
        };
    } catch (error) {
        console.error("Error seeding transactions:", error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedCampaigns(client);
    await seedTeams(client);
    await seedVolunteersWorksOrWorkedIn(client);
    await seedDonationItems(client);
    await seedCampaignStocks(client);
    await seedReliefs(client);
    await seedRecipientReceiveRelief(client);
    await seedTeamWorksWithRelief(client);
    await seedTransactions(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        "An error occurred while attempting to seed the database:",
        err
    );
});
