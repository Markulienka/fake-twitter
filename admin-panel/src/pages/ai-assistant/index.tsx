import { Card, Input, Button, List, Typography, Space, message as antdMessage } from "antd";

import { useChatHooks } from "./useChatHooks";

export default function AiAssistant() {
  const {
    isLoading,
    errorMessage,
    input,
    messages,
    hasTyped,
    handleSubmit,
    handleChange,
    setMessages,
    setInput,
  } = useChatHooks();

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chat_messages');
    }
    setMessages([]);
    setInput("");
    antdMessage.success("Chat cleared");
  };

  return (
    <Card title="AI Assistant" className="max-w-xl mx-auto my-8">
      <form onSubmit={handleSubmit}>
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item>
              <Typography.Text strong={msg.role === "user"}>
                {msg.role === "user" ? "You" : "AI"}: {msg.content}
              </Typography.Text>
            </List.Item>
          )}
          className="min-h-[200px]"
        />
        <Input.TextArea
          rows={2}
          value={input}
          onChange={handleChange}
          placeholder="Type a message..."
          disabled={isLoading}
          className="mt-4"
        />
        <Space className="w-full mt-2 flex justify-between">
          <Button danger onClick={handleClear} disabled={isLoading}>
            Clear Chat
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Send
          </Button>
        </Space>
        {errorMessage && (
          <Typography.Text type="danger" className="block mt-2">
            {errorMessage}
          </Typography.Text>
        )}
      </form>
    </Card>
  );
}
