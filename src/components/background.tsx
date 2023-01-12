import { Toaster } from "react-hot-toast";

interface BackgroundProps {
  children: React.ReactNode[] | React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <>
      <Toaster />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gin_fizz-400">
        {children}
      </main>
    </>
  );
}