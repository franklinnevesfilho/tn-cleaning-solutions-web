'use client';
import { LayoutProps } from "@/types/layout";
import {Navbar} from "@/components/navbar";
import { navRepo } from "@/repositories/navRepo";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { NavItem } from "@/models/navItems";
import { useRouter } from "next/navigation";



export default function SolutionsLayout({ children }: LayoutProps) {
    const {user, teams, logout} = useAuth();
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [expanded, setExpanded] = useState(true);

    const router = useRouter();

    const logoutAndRedirect = async () => {
        await logout();
        router.push("/login");

    }

    useEffect(() => {
        // get navItems based on user roles or teams if needed
        const fetchNavItems = async () => {
            const items = await navRepo.getActiveNavItems(teams);
            setNavItems(items);
        };
        fetchNavItems();
    }, [user, teams]);

    return (
        <div className="flex flex-row relative h-screen">
            {/* Mobile backdrop when navbar is expanded */}
            {expanded && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setExpanded(false)}
                />
            )}
            
            {/* Navbar - overlay on mobile, sidebar on desktop */}
            <div className={`
                fixed
                ${expanded ? 'md:flex' : 'md:relative'} 
                inset-y-0 left-0 z-50 md:z-auto
            `}>
                <Navbar
                    navItems={navItems}
                    expanded={expanded}
                    user={user}
                    teams={teams}
                    logout={logoutAndRedirect}
                    setExpanded={setExpanded}
                />
            </div>
            
            {/* Main content - full width on mobile, adjusted on desktop */}
            <main className={`
                flex-1 overflow-y-auto transition-all duration-300 ease-in-out
                p-4
                ${!expanded ? 'md:ml-0' : 'md:ml-64'}
            `}>
                {children}
            </main>
        </div>

    )

}