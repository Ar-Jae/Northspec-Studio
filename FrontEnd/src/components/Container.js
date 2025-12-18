import { cn } from "../lib/utils";

export default function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full px-6 lg:px-24", className)}>
      {children}
    </div>
  );
}
