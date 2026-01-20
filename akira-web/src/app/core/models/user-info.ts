export interface UserInfo {
  id?: string;
  username?: string;
  email?: string;
  password?: string; // Added for login forms
  role?: string;
  tmdb_key?: string;
  exp?: number;
  jwt_token?: string;
}
