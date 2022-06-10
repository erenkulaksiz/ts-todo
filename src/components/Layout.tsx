import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div className="w-full h-screen flex flex-col">{children}</div>;
}

export default Layout;
