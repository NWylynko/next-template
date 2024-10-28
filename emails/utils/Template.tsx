import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type { PropsWithChildren } from "react";

type TemplateProps = PropsWithChildren<{
  preview?: string;
}>;

const testProps: TemplateProps = {
  children: <Text>Put the content here</Text>,
  preview: "Example preview, wow very cool",
};

export const Template = (props: TemplateProps) => (
  <Html>
    <Tailwind>
      <Head>
        <Font fontFamily="Inter" fallbackFontFamily="sans-serif" fontWeight={400} fontStyle="normal" />
      </Head>
      {props.preview !== undefined && props.preview !== "" ? <Preview>{props.preview}</Preview> : null}
      <Body className="bg-zinc-50">
        <Container className="bg-white text-black mx-auto">
          <Header />
          <Section className="p-4">{props.children}</Section>
          <Footer />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default function () {
  return <Template {...testProps} />;
}

const Header = () => (
  <Section className="p-4">
    
  </Section>
);

const Footer = () => {
  return (
    <Section className="p-4">
      
    </Section>
  );
};
