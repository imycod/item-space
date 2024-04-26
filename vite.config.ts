import {defineConfig, ConfigEnv, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import {fileURLToPath, URL} from 'node:url';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/

const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	console.log('env-----', env);
	return {
		plugins: [
			vue(),
			// Support JSX (mainly for tests).
			// JSX for tests works well because you're able to quickly create wrapper components.
			vueJSX(),
			AutoImport({
				imports: ['vue'],
				resolvers: [
					ElementPlusResolver(),
				],
				dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
			}),
			Components({
				resolvers: [
					ElementPlusResolver(),
				],
				dts: path.resolve(pathSrc, 'components.d.ts'),
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			},
		},
		server: {
			proxy: {
				[env.VITE_API_URL]: {
					target: env.VITE_ADMIN_PROXY_PATH,
					changeOrigin: true,
					logLevel: 'debug',
					rewrite: (path) => path.replace(env.VITE_API_URL, ''),
				},
			},
		},
		define: {
			__NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
		},
	}
})
export default viteConfig;
