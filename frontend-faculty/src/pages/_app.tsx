import { FacultyUserAuthProvider } from "@/hooks/contexts/FacultyUserAuthContextProvider";
import { SchoolProvider } from "@/hooks/contexts/SchoolContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FacultyUserAuthProvider>
      <Component {...pageProps} />
    </FacultyUserAuthProvider>
  );
}
