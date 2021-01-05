import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { UserVuetifyPreset } from 'vuetify/types/services/presets';

Vue.use(Vuetify);

const opts: Partial<UserVuetifyPreset> = {
    theme: {
        themes: {
            light: {
                primary: '#F1B331',
                black: '#111',
                yellow: '#F1B331',
                white: '#F5F5F5',
                red: '#EB5757',
                grey: '#8C8C8C',
            }
        }
    }
};

export default new Vuetify(opts);
