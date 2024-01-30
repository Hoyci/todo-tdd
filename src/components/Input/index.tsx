import { useState } from "react";

interface InputProps {
    onClick: ({ title }: { title: string }) => void;
}

export default function Input({ onClick }: InputProps) {
    const [title, setTitle] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (onClick) {
            onClick({ title })
        }
    }

    return (
        <div className="py-1">
            <form onSubmit={handleSubmit} className="flex items-center justify-around">
                <input type="text" onChange={handleTitleChange} value={title} className="max-w-36 w-full border-2 border-slate-300 rounded" />
                <button type="submit" className="bg-slate-200 px-4 py-1 rounded">Create</button>
            </form>
        </div>
    )
}