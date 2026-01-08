import { BaseModel } from "./base-model";

export interface Team extends BaseModel {
    name: string;
    total: number;
    prefs: Record<string, any>;
}