export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">

      <div className="w-1/2 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}


