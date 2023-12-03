import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import { roboto } from "@/app/ui/fonts";

export default function ReliefHubLogo() {
    return (
        <div
            className={`${roboto.className} flex flex-row items-center leading-none text-white`}
        >
            <RectangleGroupIcon className="h-12 w-12 rotate-[15deg]" />
            <p className="text-[44px]">Relief Hub</p>
        </div>
    );
}
