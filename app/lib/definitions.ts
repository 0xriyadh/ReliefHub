export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: 'president' | 'moderator' | 'volunteer' | null;
  type: 'donor' | 'recipient';
  password: string;
};

export type LatestDonations = {
  id: string;
  donation_item_name: string;
  donation_item_unit: string;
  quantity: number;
  donor_name: string;
  campaign_name: string;
};

export type LatestReliefs = {
  id: string;
  relief_name: string;
  relief_location: string;
  campaign_name: string;
};

export type CampaignsTable = {
  id: string;
  name: string;
  campaign_leader_id: string;
  campaign_leader_name: string;
  status: string;
  timestamp: string;
};

export type CampaignForm = {
  id: string;
  name: string;
  campaign_leader_id: string;
  status: 'active' | 'archived';
  timestamp: string;
};

export type ReliefForm = {
  id: string;
  name: string;
  location: string;
  campaign_id: string;
  timestamp: string;
};

export type ModeratorsField = {
  id: string;
  name: string;
};

export type TeamField = {
  id: string;
  name: string;
  district: string;
  status: 'active' | 'archived';
  team_leader_id: string;
  team_leader_name: string;
  campaign_id: string;
};

export type StocksTable = {
  donation_item_id: string;
  campaign_id: string;
  item_name: string;
  item_unit: string;
  item_quantity: number;
};

export type TeamsTable = {
  id: string;
  name: string;
  district: string;
  status: 'active' | 'archived';
  team_leader_id: string;
  team_leader_name: string;
};

export type ReliefsTable = {
  id: string;
  name: string;
  location: string;
  campaign_id: string;
  timestamp: string;
};

export type DonationsTable = {
  id: string;
  quantity: number;
  donation_item_name: string;
  donation_item_unit: string;
  status: 'pending' | 'accepted' | 'received';
  campaign_name: string;
  donor_name: string;
  timestamp: string;
};

export type DonationItemForm = {
  id: string;
  name: string;
  unit: string;
};

export type UserTable = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'volunteer';
  type: 'donor' | 'recipient';
};

export type ReliefStocksField = {
  transaction_id: string;
  item_id: string;
  name: string;
  unit: 'kg' | 'piece' | 'BDT';
  quantity: number;
};

export type ReliefDistributionTable = {
  relief_id: string;
  recipient_name: string;
  item_name: string;
  item_unit: string;
  quantity: number;
  timestamp: string;
};

export type ReliefDistributionForm = {
  relief_id: string;
  recipient_id: string;
  item_id: string;
  quantity: number;
};

export type ReliefRecipientForDistribution = {
  id: string;
  name: string;
};

export type TeamForm = {
  id: string;
  name: string;
};

export type VolunteerField = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type RecipientReliefField = {
  relief_id: string;
  relief_name: string;
  recipient_name: string;
  item_name: string;
  item_unit: string;
  quantity: number;
  timestamp: string;
};
