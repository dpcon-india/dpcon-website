import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReduxWrapper from "./redux-toolkit/ReduxWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DPCON - Professional Services",
  description: "Professional services at your doorstep. Quality, reliability, and convenience combined.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxWrapper>
          <Header />
          {children}
          <Footer />
        </ReduxWrapper>
      </body>
    </html>
  );
}
