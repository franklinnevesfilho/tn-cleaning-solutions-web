import { NavItem } from "@/models/navItems";
import Link from "next/link";
import Icon from "../icons/icon";

interface NavItemProps {
    item: NavItem;
    expanded: boolean;
    color?: string;
    iconName?: string;
}

export default function NavItemComponent({ item, expanded, iconName, color = "purple" }: NavItemProps) {
    return (
        <li>
            <Link
                href={item.url}
                className={`
                    flex items-center space-x-3 p-2 text-gray-900 dark:text-white 
                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors
                    ${!expanded ? 'justify-center' : ''}
                `}
                title={!expanded ? item.label : ''}
                >
                <div
                    className={`
                        p-2 rounded-md bg-${color}-100 dark:bg-${color}-800 text-${color}-600 dark:text-${color}-400
                        flex items-center justify-center
                    `}
                >
                    {iconName ? (
                        Icon({ name: iconName, size: 20, color: "currentColor" })
                    ) : (
                        <span className="text-md md:text-xl font-semibold">{item.label.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                {expanded && <span className="text-md">{item.label}</span>}
            </Link>
        </li>
    );
}