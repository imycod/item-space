import {createPinia} from "pinia"
import piniaPluginPersist from 'pinia-plugin-persistedstate';

export default () => {
    const pinia = createPinia()
    pinia.use(piniaPluginPersist)
    return pinia
}