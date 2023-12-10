'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
      message: 'Database Error: Failed to Create Campaign.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin/campaigns');
  redirect('/admin/campaigns');
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
      message: 'Database Error: Failed to Update Campaign.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin/campaigns');
  redirect('/admin/campaigns');
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
      console.log('SQL deletion statement executed.');
    } catch (sqlError: any) {
      console.error('Error executing SQL deletion statement:', sqlError);
      if (sqlError.code === '23503') {
        throw new Error(
          'This campaign is still referenced by a team and cannot be deleted.',
        );
      } else {
        throw sqlError;
      }
    }
    console.log('Campaign Deleted.');
    revalidatePath('/admin/campaigns');
    return { success: true, message: 'Campaign Deleted.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error.toString(),
    };
  }
}

export async function createCampaignStock(formData: FormData) {
  // Prepare data for insertion into the database
  console.log(
    'createCampaignStock function called.',
    Object.fromEntries(formData.entries()),
  );
  const { campaignId, donationItemId, quantity } =
    Object.fromEntries(formData.entries()) || {};

  // Insert data into the database
  try {
    if (Number(quantity) < 0) {
      throw new Error('Quantity must be a positive number.');
    }
    await sql`
            INSERT INTO campaign_stocks (Campaign_id, Donation_item_id, Quantity)
            VALUES (${`${campaignId}`}, ${`${donationItemId}`}, ${`${Number(
              quantity,
            )}`});
        `;
  } catch (error) {
    // If a database error occurs, return a more specific error
    return {
      message: 'Database Error: Failed to Create Campaign Stock.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/admin/campaigns/${campaignId}`);
  redirect(`/admin/campaigns/${campaignId}`);
}

export async function deleteCampaignStock(
  campaignId: string,
  donationItemId: string,
) {
  // Delete data from the database
  try {
    try {
      await sql`
                DELETE FROM 
                campaign_stocks
                WHERE
                campaign_id = ${campaignId} AND donation_item_id = ${donationItemId};
            `;
      console.log('SQL deletion statement executed.');
    } catch (sqlError: any) {
      console.error('Error executing SQL deletion statement:', sqlError);
      if (sqlError.code === '23503') {
        throw new Error(
          'This campaign is still referenced by a team and cannot be deleted.',
        );
      } else {
        throw sqlError;
      }
    }
    console.log('Campaign Stock Item Deleted.');

    revalidatePath(`/admin/campaigns/${campaignId}`);
    return { success: true, message: 'Campaign Stock Item Deleted.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error.toString(),
    };
  }
}

export async function createCampaignTeam(formData: FormData) {
  // Prepare data for insertion into the database
  console.log(
    'createCampaignTeam function called.',
    Object.fromEntries(formData.entries()),
  );
  const { campaignId, teamLeaderId, name, location } =
    Object.fromEntries(formData.entries()) || {};

  // Insert data into the database
  try {
    console.log('Attempting to create campaign team.');
    await sql`
            INSERT INTO teams (name, district, team_leader_id, campaign_id)
            VALUES (${`${name}`}, ${`${location}`}, ${`${teamLeaderId}`}, ${`${campaignId}`});
        `;
    console.log('Campaign Team Created.');
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Campaign Team.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/admin/campaigns/${campaignId}/teams`);
  redirect(`/admin/campaigns/${campaignId}/teams`);
}

export async function deleteCampaignTeam(id: string) {
  // Delete data from the database
  try {
    try {
      await sql`
                    DELETE FROM 
                    teams
                    WHERE
                    id = ${id};
                `;
      console.log('SQL deletion statement executed.');
    } catch (sqlError: any) {
      console.error('Error executing SQL deletion statement:', sqlError);
      if (sqlError.code === '23503') {
        throw new Error(
          'This campaign is still referenced by a team and cannot be deleted.',
        );
      } else {
        throw sqlError;
      }
    }
    console.log('Campaign Team Deleted.');

    revalidatePath(`/admin/campaigns/${id}/teams`);
    return { success: true, message: 'Campaign Team Deleted.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error.toString(),
    };
  }
}

export async function createRelief(formData: FormData) {
  // Prepare data for insertion into the database
  console.log(
    'createRelief function called.',
    Object.fromEntries(formData.entries()),
  );
  const { campaignId, name, location } =
    Object.fromEntries(formData.entries()) || {};

  // Insert data into the database
  try {
    console.log('Attempting to create relief.');
    await sql`
            INSERT INTO reliefs (name, location, campaign_id)
            VALUES (${`${name}`}, ${`${location}`}, ${`${campaignId}`});
        `;
    console.log('Relief Created.');
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Relief.',
    };
  }

  // // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/admin/campaigns/${campaignId}/reliefs`);
  redirect(`/admin/campaigns/${campaignId}/reliefs`);
}

export async function deleteRelief(id: string) {
  // Delete data from the database
  try {
    try {
      await sql`
        DELETE 
        FROM 
          reliefs
        WHERE
          id = ${id};
      `;
      console.log('SQL deletion statement executed.');
    } catch (sqlError: any) {
      console.error('Error executing SQL deletion statement:', sqlError);
      if (sqlError.code === '23503') {
        throw new Error(
          'This campaign is still referenced by a team and cannot be deleted.',
        );
      } else {
        throw sqlError;
      }
    }
    console.log('Relief Deleted.');

    revalidatePath(`/admin/campaigns/${id}/reliefs`);
    return { success: true, message: 'Relief Deleted.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error.toString(),
    };
  }
}

export async function deleteDonation(id: string) {
  // Delete data from the database
  try {
    try {
      await sql`
        DELETE 
        FROM 
          transactions
        WHERE
          id = ${id};
      `;
      console.log('SQL deletion statement executed.');
    } catch (sqlError: any) {
      console.error('Error executing SQL deletion statement:', sqlError);
      if (sqlError.code === '23503') {
        throw new Error(
          'This campaign is still referenced by a team and cannot be deleted.',
        );
      } else {
        throw sqlError;
      }
    }
    console.log('Donation Deleted.');

    revalidatePath(`/admin/donations`);
    return { success: true, message: 'Donation Deleted.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error.toString(),
    };
  }
}
