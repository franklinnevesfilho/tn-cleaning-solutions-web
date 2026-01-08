import { Team } from "@/models/team";
import { BaseRepo } from "./base-repo";
import { NavItem } from "@/models/navItems";

class NavRepo extends BaseRepo<NavItem> {
    constructor() {
        super('navItems'); // assuming 'nav_items' is the table name in Appwrite
    }

    getActiveNavItems(teams: Team[]): Promise<NavItem[]> {
        const teamIds = teams.map(team => team.$id);
        
        const queries = [
            `isActive=eq.true`,
            `parentId=eq.null`,
            `teamIds=in.${teamIds.join(',')}`
        ];

        return this.getAll(queries).then(result => result.data);
    }
}

export const navRepo = new NavRepo();