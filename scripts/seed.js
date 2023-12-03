const { db } = require("@vercel/postgres");
const { members, teams, campaigns, volunteersWorksOrWorkedIn, donationItems } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedMembers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "members" table if it doesn't exist
        const createTable = await client.sql`
        DO $$ BEGIN
          IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_role') THEN
            DROP TYPE member_role;
          END IF;
        END $$;
        CREATE TYPE member_role AS ENUM ('president', 'moderator', 'volunteer', 'member');
          CREATE TABLE IF NOT EXISTS members (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            address TEXT NOT NULL,
            role member_role NOT NULL,
            password TEXT NOT NULL
          );
        `;

        console.log(`Created "members" table`);

        // Insert data into the "members" table
        const insertedMembers = await Promise.all(
            members.map(async (member) => {
                const hashedPassword = await bcrypt.hash(member.password, 10);
                return client.sql`
        INSERT INTO members (name, phone, email, address, role, password)
        VALUES (${member.name}, ${member.phone}, ${member.email}, ${member.address}, ${member.role}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
            })
        );

        console.log(`Seeded ${insertedMembers.length} members`);

        return {
            createTable,
            members: insertedMembers,
        };
    } catch (error) {
        console.error("Error seeding members:", error);
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
            FOREIGN KEY (campaign_leader_id) REFERENCES members(id)
          );
        `;

        console.log(`Created "campaigns" table`);

        // Insert data into the "teams" table
        const insertedCampaigns = await Promise.all(
            campaigns.map(async (campaign) => {
                return client.sql`
                    INSERT INTO campaigns (name, campaign_leader_id)
                    VALUES (${campaign.name}, ${campaign.campaign_leader_id})
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
            FOREIGN KEY (team_leader_id) REFERENCES members(id),
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
          );
        `;

        console.log(`Created "teams" table`);

        // Insert data into the "teams" table
        const insertedTeams = await Promise.all(
            teams.map(async (team) => {
                return client.sql`
                    INSERT INTO teams (name, district, status, team_leader_id, campaign_id)
                    VALUES (${team.name}, ${team.district}, ${team.status}, ${team.team_leader_id}, ${team.campaign_id})
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

        // Create the "VolunteersWorksOrWorkedIn" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS volunteersWorksOrWorkedIn (
            volunteer_id UUID NOT NULL,
            team_id UUID NOT NULL,
            FOREIGN KEY (volunteer_id) REFERENCES members(id),
            FOREIGN KEY (team_id) REFERENCES teams(id),
            PRIMARY KEY (volunteer_id, team_id)
          );
        `;

        console.log(`Created "volunteersWorksOrWorkedIn" table`);

        // Insert data into the "volunteersWorksOrWorkedIn" table
        const insertedVolunteersWorksOrWorkedIn = await Promise.all(
            volunteersWorksOrWorkedIn.map(async (temp) => {
                return client.sql`
                    INSERT INTO volunteersWorksOrWorkedIn (volunteer_id, team_id)
                    VALUES (${temp.volunteer_id}, ${temp.team_id})
                    ON CONFLICT (volunteer_id, team_id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedVolunteersWorksOrWorkedIn.length} volunteersWorksOrWorkedIn`);

        return {
            createTable,
            volunteersWorksOrWorkedIn: insertedVolunteersWorksOrWorkedIn,
        };
    } catch (error) {
        console.error("Error seeding volunteersWorksOrWorkedIn:", error);
        throw error;
    }
}

async function seedDonationItems(client) { 
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "donationItems" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS donationItems (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            unit VARCHAR(150) NOT NULL
          );
        `;

        console.log(`Created "donationItems" table`);

        // Insert data into the "donationItems" table
        const insertedDonationItems = await Promise.all(
            donationItems.map(async (item) => {
                return client.sql`
                    INSERT INTO donationItems (name, unit)
                    VALUES (${item.name}, ${item.unit})
                    ON CONFLICT (id) DO NOTHING;
                `;
            })
        );

        console.log(`Seeded ${insertedDonationItems.length} donationItems`);

        return {
            createTable,
            donationItems: insertedDonationItems,
        };
    } catch (error) {
        console.error("Error seeding donationItems:", error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    // await seedMembers(client);
    // await seedCampaigns(client);
    // await seedTeams(client);
    // await seedVolunteersWorksOrWorkedIn(client);
    await seedDonationItems(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        "An error occurred while attempting to seed the database:",
        err
    );
});
