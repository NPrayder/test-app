import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/interfaces/state';

import { auth } from '@/store/modules/auth';
import { report } from '@/store/modules/reports';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: {
        auth,
        report
    }
}

export default new Vuex.Store(store);
