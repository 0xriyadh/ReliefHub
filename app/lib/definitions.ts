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
