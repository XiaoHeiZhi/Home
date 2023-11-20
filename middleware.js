import { NextResponse } from "next/server";
import { languages, cookieName, fallbacking } from "./app/i18n/settings";
import acceptLanguage from "accept-language";

// 第一步设置支持语言
acceptLanguage.languages(languages);

// 第二步排除匹配项（api、_next/static、_next/image、assets、favicon.ico、sw.js）的任意字符串
export const config = {
  // 不包含
  mather: ["/((?!api|_next/static|_next/image|assets|favcion.ico|sw.js).*)"],
};

// 创建中间件
export function middleware(req) {
  let lng;

  //检测是否已经有在cookie中有选择的语言
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  }
  if (!lng) {
    // 获取客户端的首选语言
    lng = acceptLanguage.get(req.header.get("Accept-Language"));
  }
  if (!lng) {
    // 将其设成默认
    lng = fallbacking;
  }

  //如果路径不支持Lng，则重定向
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  //根据请求头部中的 referer 字段提取出语言信息，并将语言信息存储到 cookie 中。这样做的可能原因是为了在用户访问不同页面时保持一致的语言选择，即在用户通过点击链接访问不同页面时，保持之前选择的语言。
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      //判断refererUrl是否以{l}开头的
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    // 如果是的话，设置cookieName
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
