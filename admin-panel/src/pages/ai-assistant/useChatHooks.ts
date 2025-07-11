import React, { useState, useEffect } from "react";

interface Messages {
    role: "user" | "assistant";
    content: string;
}

export function useChatHooks() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [hasTyped, setHasTyped] = useState(false);
    const [messages, setMessages] = useState<Messages[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('chat_messages');
            if (saved) {
                try {
                    setMessages(JSON.parse(saved));
                } catch {
                    setMessages([]);
                }
            }
        }
    }, []);

    const saveMessages = (msgs: Messages[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chat_messages', JSON.stringify(msgs));
        }
    };

    const addMessage = (msg: Messages) => {
        setMessages(prev => {
            const updated = [...prev, msg];
            saveMessages(updated);
            return updated;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        if (value.trim() !== "" && !hasTyped) {
            setHasTyped(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);
        const newMessage = { role: "user" as const, content: input };
        const updated = [...messages, newMessage];
        setMessages(updated);
        saveMessages(updated);
        setInput("");

        const res = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updated }),
        };
        try {
            const response = await fetch("/api/groq", res);
            if (!response.ok) throw new Error("Error fetching data");
            const data = await response.json();
            if (data && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
                addMessage({ role: "assistant", content: data.choices[0].message.content });
            } else if (data?.error) {
                addMessage({ role: "assistant", content: "An error occurred: " + data.error });
            } else {
                addMessage({ role: "assistant", content: "Unexpected response from server." });
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unknown error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        errorMessage,
        input,
        messages,
        hasTyped,
        handleSubmit,
        handleChange,
        setMessages,
        setInput,
    };
}