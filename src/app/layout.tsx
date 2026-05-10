import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVAIX OS | Cognitive Infrastructure Platform",
  description: "Cinematic operating interface for enterprise cognitive infrastructure."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <div className="scanlines" />
        <div className="noise" />
      </body>
    </html>
  );
}
