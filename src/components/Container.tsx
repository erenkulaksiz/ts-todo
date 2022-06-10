import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto container h-full lg:max-w-4xl px-2">{children}</div>
  );
}

export default Container;
