import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@providers/providers";


export const metadata: Metadata = {
  title: "Digitlayte",
  description: "A tech devices of market places",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
