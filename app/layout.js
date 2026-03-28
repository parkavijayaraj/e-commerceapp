import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "MyShop",
  description: "E-commerce App",
  icons: {
    icon: "/favicon.ico", // ✅ important
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}