import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const TweetEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
      </Form>
    </Edit>
  );
};