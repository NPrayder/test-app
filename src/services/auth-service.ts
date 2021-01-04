import { AuthData } from '@/interfaces/auth-data';

const login = (authData: AuthData): Promise<string> => {
    return new Promise<string>(resolve => setTimeout(() => resolve('token'), 1500));
};

const logout = (): Promise<void> => {
    return Promise.resolve();
}

export const authService = {
    login,
    logout,
};
