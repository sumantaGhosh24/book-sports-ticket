const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;
