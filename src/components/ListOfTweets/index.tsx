import type { Tweet } from "../../types";

interface ListOfTweetsProps {
    tweets: Tweet[];
    onDelete?: (id: string) => void;
}

export default function TweetList({ tweets, onDelete }: ListOfTweetsProps) {
    return (
        <div className='flex flex-col gap-4'>
            {tweets.map((tweet) => (
                <div key={tweet.id} className='p-4 border rounded-lg shadow-sm'>
                    <h3 className='font-bold'>{tweet.name}</h3>
                    <p>{tweet.text}</p>
                    {onDelete && (
                        <button onClick={() => onDelete(tweet.id)} className='text-red-500'>
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
