import { BaseModel } from './base-model';
import { type Models } from 'appwrite';

export interface UserRole extends BaseModel {
    name: string;
}

export interface User extends Models.User, BaseModel {
    role?: UserRole;
}