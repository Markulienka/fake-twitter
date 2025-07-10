import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const TweetCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Text"
          name={["text"]}
          rules={[
            {
              required: true,
              message: "Text is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author ID"
          name={["userId"]}
          rules={[
            {
              required: true,
              message: "Author ID is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};