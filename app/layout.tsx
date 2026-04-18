import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Your Workspace",
  description:
    "Craft your dream remote workspace in Bali. Choose desks, chairs, monitors and accessories — see your setup come to life in 3D, then rent it all with one click.",
  openGraph: {
    title: "Design Your Workspace",
    description: "Build your perfect Bali workspace in 3D and rent it instantly.",
    type: "website",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
