import { Template } from "./Template";

type EmailOptions<Props extends object, Name extends string> = {
  testProps: Props;
  name: Name;
  preview: (props: Props) => string;
  subject: (props: Props) => string;
  template: (props: Props) => JSX.Element;
};

type Email<Props extends object, Name extends string> = {
  [key in Name]: {
    name: Name;
    build: (props: Props) => {
      jsx: () => JSX.Element;
      subject: string;
    };
  };
} & {
  testEmail: () => JSX.Element;
};

export const DefineEmail = <Props extends object, Name extends string = string>(options: EmailOptions<Props, Name>) => {

  const TemplateEmail = (props: Props) => {
    return (
      <Template preview={options.preview(props)}>
        <options.template {...props} />
      </Template>
    );
  };

  return {
    [options.name]: {
      name: options.name,
      build: (props: Props) => ({
        jsx: () => <TemplateEmail {...props} />,
        subject: options.subject(props),
      }),
    },
    testEmail: () => <TemplateEmail {...options.testProps} />,
  } as Email<Props, Name>;
};
