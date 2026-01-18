import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <body className={`h-screen antialiased`}>{children}
        <Toaster position="top-right"/>
      </body>

    </html>
  );
}
