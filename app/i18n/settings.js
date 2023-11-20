export const fallbacking = "en";
export const languages = [fallbacking, "zh"];
// 默认的路径名称
export const defalutNS = "translation";
export const cookieName = "i18next";

// getOptions函数接受lng,ns两个参数（lng为动态路由路径，ns为翻译json文件路径）
export function getOptions({ lng = fallbacking, ns = defalutNS }) {
  return {
    // 支持的语言
    supportedLng: languages,
    // 默认语言
    fallbacking,
    // 传入的语言
    lng,
    // 默认的路径
    fallbackNS: defalutNS,
    defalutNS,
    // 传入的路径
    ns
  };
}
