// @ts-nocheck
import { createI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import pinia from "@/stores/index.ts"
import { useThemeStore } from '@/stores/theme';

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

// 定义变量内容
const messages = {};
const element = { en: enLocale, 'zh-cn': zhcnLocale };
const itemize = { en: [], 'zh-cn': [] };

const langFiles = require.context('./lang', true, /\.ts$/);
const langModules = {};
langFiles.keys().forEach(key => {
	const moduleName = key.replace(/^.\/(.*)\.\w+$/, '$1');
	langModules[moduleName] = langFiles(key).default;
});

// 读取 pages 目录下的所有文件，包括子目录
const pageFiles = require.context('./pages', true, /\.ts$/);
const pageModules = {};
pageFiles.keys().forEach(key => {
	const moduleName = key.replace(/^.\/(.*)\.\w+$/, '$1');
	pageModules[moduleName] = pageFiles(key).default;
});

// 对自动引入的 modules 进行分类 en、zh-cn、zh-tw
// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
for (const key in langModules) {
	if (itemize[key]) {
		itemize[key].push(langModules[key]);
	} else {
		itemize[key] = langModules[key];
	}
}

for (const key in pageModules) {
	const [_,n]= key.split('/')
	if (itemize[n]) {
		itemize[n].push(pageModules[key]);
	} else {
		itemize[n] = pageModules[key];
	}
}

// 合并数组对象（非标准数组对象，数组中对象的每项 key、value 都不同）
function mergeArrObj(list, key) {
	let obj = {};
	list[key].forEach((i) => {
		obj = Object.assign({}, obj, i);
	});
	return obj;
}

for (const key in itemize) {
	messages[key] = {
		name: key,
		el: element[key].el,
		...mergeArrObj(itemize, key),
	};
}


// 读取 pinia 默认语言
const stores = useThemeStore(pinia);
const { lang } = storeToRefs(stores);

// 导出语言国际化
export const i18n = createI18n({
	legacy: false,
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: lang.value,
	fallbackLocale: zhcnLocale.name,
	messages,
});