import { type PropsWithChildren } from "react";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function PublicSiteLayout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
