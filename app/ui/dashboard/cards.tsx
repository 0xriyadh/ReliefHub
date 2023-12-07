import {
    BanknotesIcon,
    UserIcon,
    LockClosedIcon,
    LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
    moderators: LockClosedIcon,
    volunteers: UserIcon,
    campaigns: LifebuoyIcon,
    donations: BanknotesIcon,
};

export default async function CardWrapper() {
    const {
        numberOfModerators,
        numberOfVolunteers,
        numberOfCampaigns,
        numberOfDonations,
    } = await fetchCardData();

    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <Card
                title="Total Moderators"
                value={numberOfModerators}
                type="moderators"
            />
            <Card title="Total Volunteers" value={numberOfVolunteers} type="volunteers" />
            <Card
                title="Total Campaigns"
                value={numberOfCampaigns}
                type="campaigns"
            />
            <Card
                title="Total Donations"
                value={numberOfDonations}
                type="donations"
            />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: "moderators" | "volunteers" | "campaigns" | "donations";
}) {
    const Icon = iconMap[type];

    return (
        <div className="bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className="truncate bg-white px-4 py-8 text-center text-2xl">
                {value}
            </p>
        </div>
    );
}
