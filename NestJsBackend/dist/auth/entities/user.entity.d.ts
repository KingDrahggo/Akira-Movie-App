import { UserRole } from '../enums/user-role.enum';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    tmdb_key: string;
}
