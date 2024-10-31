import { Entity } from "../../../../database/core/interface/entity";

export interface UserAttributes extends Entity {
    name: string;
    email: string;
    password: string;
    confirmation_code?: string | null;
    confirmed: boolean;
}

export interface UserUpdateAttributes extends Entity {
    name?: string;
    email?: string;
    password?: string;
    confirmation_code?: string | null;
    confirmed?: boolean;
}