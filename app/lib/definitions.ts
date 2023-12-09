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
    status: "active" | "archived";
    timestamp: string;
};

export type ModeratorsField = {
    id: string;
    name: string;
}

export type TeamField = {
    id: string;
    name: string;
    district: string;
    status: "active" | "archived";
    team_leader_id: string;
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
    status: "active" | "archived";
    team_leader_id: string;
    team_leader_name: string;
};

export type DonationItemForm = {
    id: string;
    name: string;
    unit: string;
}