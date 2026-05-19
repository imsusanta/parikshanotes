import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ParikshaNotes — India Ka Sabse Trusted Notes Platform",
    template: "%s | ParikshaNotes",
  },
  description:
    "Hand-picked, exam-focused notes for SSC, UPSC, Railway, Banking & more. Download PDF notes instantly or order printed notes with COD.",
  keywords: [
    "SSC notes",
    "UPSC notes",
    "Railway exam notes",
    "Banking exam notes",
    "Government job preparation",
    "Study material India",
    "PDF notes download",
    "Printed study notes",
  ],
  openGraph: {
    title: "ParikshaNotes — India Ka Sabse Trusted Notes Platform",
    description:
      "Hand-picked, exam-focused notes for SSC, UPSC, Railway, Banking & more.",
    type: "website",
    locale: "en_IN",
    siteName: "ParikshaNotes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Latin:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-body)] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1F2833",
              color: "#F4F1EB",
              border: "1px solid rgba(255, 153, 51, 0.2)",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#FF9933",
                secondary: "#0B0C10",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
