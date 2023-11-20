import "./globals.css";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({
    lng,
  }));
}

const menu = [
  {
    path: "stories",
    text: "Stories",
  },
  {
    path: "resources",
    text: "Resources",
  },
  {
    path: "intelinkGo",
    text: "IntelinkGo",
  },
  {
    path: "applications",
    text: "Applications",
  },
  {
    path: "ecotopia",
    text: "Ecotopia",
  },
  {
    path: "products",
    text: "Products",
  },
];

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <div className="h-16 flex">
          <div className="w-1/6 flex items-center justify-center">
            <a href="https://druid.tech">
              <img
                src="https://druid.tech/wp-content/uploads/2020/09/cropped-LOGO_%E7%94%BB%E6%9D%BF-1.png"
                alt="图片加载失败"
                className="w-24 h-8"
              />
            </a>
          </div>
          <div className="flex-grow">
            <ul className="flex flex-row-reverse h-16">
              {menu.map((item) => {
                return (
                  <a href={`/${item.path}`}>
                    <li
                      key={item.path}
                      className="text-center pt-5 pb-5 pl-4 pr-4 font-sans"
                    >
                      {item.text}
                    </li>
                  </a>
                );
              })}
            </ul>
          </div>
          <div className="w-1/6 flex items-center">
            <button
              type="button"
              className=" bg-[#69becb] text-white w-74px h-33px rounded-md hover:w-16 hover:h-7 hover:text-sm transtion-all duration-1000"
            >
              LOG IN
            </button>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
