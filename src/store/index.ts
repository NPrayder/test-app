import Vue from "vue";
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/interfaces/state';

import {auth} from '@/store/modules/auth';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    auth,
  }
}

export default new Vuex.Store(store);
