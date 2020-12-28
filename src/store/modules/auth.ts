import { AuthState, RootState } from '@/interfaces/state';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import * as mutationTypes from '@/store/mutationTypes';
import * as actionTypes from '@/store/actionTypes';
import { AuthData } from '@/interfaces/auth-data';
import { authService } from '@/services/auth-service';

export const state: AuthState = {
    isLoggedIn: false,
    username: null,
};

export const getters: GetterTree<AuthState, RootState> = {
    isLoggedIn: (state: AuthState) => state.isLoggedIn,
    username: (state: AuthState) => state.username,
};

export const mutations: MutationTree<AuthState> = {
    [mutationTypes.SET_LOGIN_STATE]: (state: AuthState, value: boolean) => {
        state.isLoggedIn = value;
    },
    [mutationTypes.SET_USERNAME]: (state: AuthState, username: string | null) => {
        state.username = username;
    }
};

export const actions: ActionTree<AuthState, RootState> = {
    [actionTypes.LOGIN]: async ({commit}: ActionContext<AuthState, RootState>, authData: AuthData) => {
        try {
            await authService.login(authData);
            commit(mutationTypes.SET_USERNAME, authData.username);
            commit(mutationTypes.SET_LOGIN_STATE, true);
        } catch (e) {
            alert(e);
        }
    },
    [actionTypes.LOGOUT]: async ({commit}: ActionContext<AuthState, RootState>) => {
        try {
            await authService.logout();
            commit(mutationTypes.SET_USERNAME, null);
            commit(mutationTypes.SET_LOGIN_STATE, false);
        } catch (e) {
            alert(e);
        }
    }
};

export const auth: Module<AuthState, RootState> = {
    state,
    getters,
    mutations,
    actions
};
