import { Text } from "@react-email/components";
import { DefineEmail } from "./utils/Email";

const { ExampleEmail, testEmail } = DefineEmail({
  testProps: {
    email: "test@example.com",
  },
  name: "ExampleEmail",
  subject: () => "This is an Example",
  preview: () => "How won't believe what happened",
  template: (props) => (
    <>
      <Text>Hello {props.email}</Text>
    </>
  ),
});

export { ExampleEmail };
export default testEmail;
