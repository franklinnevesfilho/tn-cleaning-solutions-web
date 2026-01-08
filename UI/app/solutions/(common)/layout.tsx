'use client';
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { LayoutProps } from "@/types/layout";
import { navRepo } from "@/repositories/navRepo";
import { useAuth } from "@/hooks/useAuth";
import { NavItem } from "@/models/navItems";
import { Team } from "@/models/team";

export default function Layout({ children }: LayoutProps) {
    const {user, teams, logout} = useAuth();
    const [expandedNav, setExpandedNav] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>([]);

    async function fetchNavItems(teams: Team[]) {
        const data = await navRepo.getActiveNavItems(teams);
        setNavItems(data);
    }
    
    useEffect(() => {
        fetchNavItems(teams);
    }, [teams]);

    return (
        <div className="flex h-screen">
            {
                user == null && navItems.length === 0 ? (
                    <div>Loading...</div>
                ):(
                    <>
                        <Navbar
                            expanded={expandedNav}
                            setExpanded={setExpandedNav}
                            navItems={navItems}
                            user={user}
                            teams={teams}
                            logout={logout}
                        />
                        <main className="flex-1 overflow-y-auto">
                            <div className="p-6">
                                {children}
                            </div>
                        </main>
                    </>
                ) 
            }
        </div>
    );
}