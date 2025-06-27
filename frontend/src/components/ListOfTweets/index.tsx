import type { Tweet } from "../../types";

interface ListOfTweetsProps {
    tweets: Tweet[];
    onDelete?: (id: string) => void;
    onToggleLike?: (id: string) => void;
    likedTweetIds?: Set<string>;
}

export default function TweetList({ tweets, onDelete, onToggleLike, likedTweetIds = new Set() }: ListOfTweetsProps) {
    return (
        <div className="flex flex-col gap-4">
            {tweets.map((tweet) => {
                const isLiked = likedTweetIds.has(tweet.id);
                
                return (
                    <div key={tweet.id} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="font-bold">{tweet.authorName}</h3>
                        <p>{tweet.text}</p>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onToggleLike?.(tweet.id)}
                                    className="text-xl cursor-pointer"
                                >
                                    {isLiked ? '❤️' : '🤍'}
                                </button>
                                <span className="text-sm text-gray-600">{tweet.likesCount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(tweet.id)}
                                        className="text-red-500 text-sm cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
