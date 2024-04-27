import {createI18n} from 'vue-i18n';
import pinia from '@/stores/index';
import {storeToRefs} from 'pinia';
import {useThemeConfig} from '@/stores/themeConfig';

// 定义语言国际化内容

/**
 * 说明：
 * 须在 pages 下新建文件夹（建议 `要国际化界面目录` 与 `i18n 目录` 相同，方便查找），
 * 注意国际化定义的字段，不要与原有的定义字段相同。
 * 1、/src/i18n/lang 下的 ts 为框架的国际化内容
 * 2、/src/i18n/pages 下的 ts 为各界面的国际化内容
 */

// element plus 自带国际化
import enLocale from 'element-plus/es/locale/lang/en';
import zhcnLocale from 'element-plus/es/locale/lang/zh-cn';
import jaLocale from 'element-plus/es/locale/lang/ja';

// 定义变量内容
const messages = {};
const element = {en: enLocale, 'zh-cn': zhcnLocale, 'jp': jaLocale};
const itemize = {en: [] as any[], 'zh-cn': [] as any[], 'jp': [] as any[]};
const modules: Record<string, any> = import.meta.glob('./**/*.ts', {eager: true});
const pages: Record<string, any> = import.meta.glob('./../../**/**/**/i18n/*.ts', {eager: true});

// 对自动引入的 modules 进行分类 en、zh-cn、zh-tw
// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
for (const path in modules) {
	const key = path.match(/(\S+)\/(\S+).ts/);
	if (itemize[key![2]]) itemize[key![2]].push(modules[path].default);
	else itemize[key![2]] = modules[path];
}

for (const path in pages) {
	const key = path.match(/(\S+)\/(\S+).ts/);
	if (itemize[key![2]]) itemize[key![2]].push(pages[path].default);
	else itemize[key![2]] = pages[path];
}


// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj<T>(list: T, key: string) {
	let obj = {};
	list[key].forEach((i: EmptyObjectType) => {
		obj = Object.assign({}, obj, i);
	});
	return obj;
}

for (const key in itemize) {
	console.log(key)
	messages[key] = {
		name: key,
		el: element[key].el,
		...mergeArrObj(itemize, key),
	};
}

// 读取 pinia 默认语言
const stores = useThemeConfig(pinia);
const {themeConfig} = storeToRefs(stores);

// 导出语言国际化
export const i18n = createI18n({
	legacy: false,
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: themeConfig.value.globalI18n,
	fallbackLocale: zhcnLocale.name,
	messages,
});