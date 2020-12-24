import { AuthData } from '@/interfaces/auth-data';

const login = (authData: AuthData): Promise<void> => {
    console.log(authData);
    return new Promise<void>(resolve => setTimeout(resolve, 3000));
};

const logout = (): Promise<void> => {
    return Promise.resolve();
}

export const authService = {
    login,
    logout,
};
