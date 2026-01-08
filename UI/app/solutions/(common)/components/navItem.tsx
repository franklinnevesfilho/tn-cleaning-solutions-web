import { NavItem } from "@/models/navItems";

interface NavItemProps {
    item: NavItem;
    expanded: boolean;
}

export default function NavItemComponent({ item, expanded }: NavItemProps) {
    return (
        <li>
            <div className={`
                flex items-center space-x-3 p-2 rounded-md 
                hover:bg-gray-100 dark:hover:bg-gray-700 
                transition-colors cursor-pointer
                ${!expanded ? 'justify-center' : ''}
            `}>
                <div className="w-6 h-6 bg-purple-500 dark:bg-purple-600 rounded flex items-center justify-center text-xs font-medium text-white">
                    {item.label.charAt(0).toUpperCase()}
                </div>
                {expanded && (
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{item.label}</p>
                    </div>
                )}
            </div>
        </li>
    );
}