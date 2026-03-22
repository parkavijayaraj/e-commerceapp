import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ShopLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Sidebar />
    </>
  );
}


