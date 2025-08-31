import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import Navbar from "@/components/global/nav";
import Footer from "@/components/global/footer";
import ScrollButton from "@/components/landing/ScrollButton"; // 👈 import your button here

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sankalp",
    template: "%s | Sankalp",
  },
  description:
    "Where the boldest builders come to play. Join Sankalp, the ultimate hackathon experience for innovators, creators, and tech enthusiasts.",
  keywords: [
    "Sankalp",
    "Hackathon",
    "Indore",
    "Tech Event",
    "Developers",
    "Innovation",
    "Builders",
    "Coding",
    "Competition",
    "2025",
  ],
  metadataBase: new URL("https://sankalp2025.vercel.app/"),
  openGraph: {
    title: "Sankalp",
    description:
      "Where the boldest builders come to play. Join Sankalp, the ultimate hackathon experience for innovators, creators, and tech enthusiasts.",
    url: "https://sankalp2025.vercel.app/",
    siteName: "Sankalp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sankalp",
    description:
      "Where the boldest builders come to play. Join Sankalp, the ultimate hackathon experience for innovators, creators, and tech enthusiasts.",
    images: ["/assets/sankalp_title.png"],
    site: "@sankalp",
    creator: "@sankalp",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      {
        url: "/favicon_io/tab_logo.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/tab_logo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/tab_logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [{ url: "/favicon_io/tab_logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=archivo@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901,1,2&f[]=clash-display@200,300,400,500,600,700,1&f[]=melodrama@300,400,500,600,700,1&f[]=boska@200,201,300,301,400,401,500,501,700,701,900,901&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased ${hostGrotesk.className} bg-[#141414]`}>
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollButton /> {/* 👈 Global scroll button here */}
        </LenisProvider>
      </body>
    </html>
  );
}
