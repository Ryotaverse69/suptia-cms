
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://suptia.com"),
  title: "Suptia - あなたにピッタリのサプリメントを見つけよう",
  description: "誰もが自分にピッタリの安くて安全なサプリメントに出会えるように、サプリメントの成分に関する情報を提供します。",
  openGraph: {
    title: "Suptia - あなたにピッタリのサプリメントを見つけよう",
    description: "誰もが自分にピッタリの安くて安全なサプリメントに出会えるように、サプリメントの成分に関する情報を提供します。",
    url: "https://suptia.com", // あとで本番環境のURLに変更
    siteName: "Suptia",
    images: [
      {
        url: "/ogp.png", // OGP画像のパス
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suptia - あなたにピッタリのサプリメントを見つけよう",
    description: "誰もが自分にピッタリの安くて安全なサプリメントに出会えるように、サプリメントの成分に関する情報を提供します。",
    // site: "@your_twitter_handle", // Twitterアカウント
    // creator: "@your_twitter_handle", // Twitterアカウント
    images: ["/ogp.png"], // OGP画像のパス
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-MVW9Q0XRBR`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MVW9Q0XRBR');
          `}
        </Script>
      </body>
    </html>
  );
}
