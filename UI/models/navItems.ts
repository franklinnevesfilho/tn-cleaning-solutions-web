import { BaseModel } from "./base-model";

export interface NavItem extends BaseModel {
    label: string;
    url: string;
    iconName?: string;
    order: number;
    isActive: boolean;
    parentId?: string;
    teamIds?: string[];
}