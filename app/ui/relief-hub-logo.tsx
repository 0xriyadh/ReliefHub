import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import { roboto } from "@/app/ui/fonts";

export default function ReliefHubLogo() {
    return (
        <div
            className={`${roboto.className} flex flex-row items-center leading-none text-white`}
        >
            <RectangleGroupIcon className="h-24 w-24 rotate-[15deg]" />
            {/* <p className="text-3xl">Relief Hub</p> */}
        </div>
    );
}
