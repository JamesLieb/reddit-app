import React from "react";
import { useSelector } from "react-redux";

export const Subreddits = () => {
    const results = useSelector((state) => state.subreddits);
    return (
        <div className="flex-col">
            {results.map((subreddit) => (
                <div key={subreddit.data.id} className="border p-4 m-2 justify-center items-center">
                    <h3 className="p-3 bold">{subreddit.data.subreddit}
                        <p className="text-center">{subreddit.data.title}</p>
                    </h3>
                    <div className="flex justify-center">
                        { subreddit.data.media && subreddit.data.is_video ? 
                        <video controls width="250">
                            <source src={subreddit.data.media.reddit_video.fallback_url} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video> : null}
                    </div>
                </div>
            ))}
        </div>
    )
};