import "./globals.css";

export const metadata = {
  title: "Mini ERP – Inventory & Sales Management System",
  description: "Mini ERP for Inventory and Sales Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
