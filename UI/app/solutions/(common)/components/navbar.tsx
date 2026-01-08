import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { NavItem } from "@/models/navItems";
import { navRepo } from "@/repositories/navRepo";
import NavItemComponent from "./navItem";
import { User } from "@/models/user";
import { Team } from "@/models/team";

interface NavbarProps {
    expanded: boolean;
    navItems: NavItem[];
    user: User | null;
    teams: Team[];
    logout: () => Promise<void>;
    setExpanded: (expanded: boolean) => void;
}

export default function Navbar({navItems, expanded, user, teams, logout, setExpanded }: NavbarProps) {

    return (
        <nav className={`
            bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-screen transition-all duration-300 ease-in-out
            ${expanded ? 'w-64' : 'w-16'} 
            flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700
        `}>
            {/* Header with toggle button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    {expanded && (
                        <h1 className="text-lg font-semibold truncate text-gray-800 dark:text-white">TN Cleaning</h1>
                    )}
                    <button
                        onClick={() => setExpanded && setExpanded(!expanded)}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                    >
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* User info section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    {expanded && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{user?.name}</p>
                            <p className="text-xs truncate text-gray-500 dark:text-gray-400">{user?.email}</p>
                            
                            {/* Teams as tags */}
                            {teams.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Teams:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {teams.map(team => (
                                            <span 
                                                key={team.$id}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                            >
                                                {team.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                    {expanded && (
                        <h3 className="text-xs font-semibold uppercase tracking-wide mb-3 text-gray-500 dark:text-gray-400">
                            Navigation
                        </h3>
                    )}
                    <ul className="space-y-2">
                        {navItems.map(item => (
                            <NavItemComponent 
                                key={item.$id} 
                                item={item} 
                                expanded={expanded || false} 
                            />
                        ))}
                    </ul>
                    {navItems.length === 0 && expanded && (
                        <p className="text-xs text-center py-4 text-gray-500 dark:text-gray-400">No navigation items</p>
                    )}
                </div>
            </div>

            {/* Bottom section with logout */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={logout}
                    className={`
                        w-full flex items-center space-x-3 p-2 text-red-500 dark:text-red-400 
                        hover:text-red-600 dark:hover:text-red-300 
                        hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors
                        ${!expanded ? 'justify-center' : ''}
                    `}
                    title={!expanded ? 'Logout' : ''}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {expanded && <span className="text-sm">Logout</span>}
                </button>
            </div>
        </nav> 
    );
}