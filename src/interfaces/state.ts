export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
}

export interface RootState {
    auth: AuthState,
}
