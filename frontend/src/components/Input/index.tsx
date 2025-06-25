import { useState } from "react";

interface InputProps {
    onAddTweet: (text: string) => void;
}

export default function Input({ onAddTweet }: InputProps) {
    const [text, setText] = useState("");

    const handleSumbit = () => {
        if (text.trim() === '') return;
        onAddTweet(text);
        setText("");
    }

    return (
        <div className="flex flex-col gap-2">
            <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write"
            className="border p-2 rounded"
            />
            <button
                onClick={handleSumbit}
                className="bg-blue-500 text-white rounded p-2 cursor-pointer"
            >
                Send
            </button>
        </div>
    );
}