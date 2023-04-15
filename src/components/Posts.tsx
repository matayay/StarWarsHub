import { FC } from "react";
import { Data } from "../routes/Home";
import { useState, useEffect } from "react";

interface Props {
    posts: Data[];
    search: string;
    getTime: (seconds: number) => { since: number; multi: string };
}

const Posts: FC<Props> = (props) => {
    const [currPosts, setCurrPosts] = useState<React.ReactNode>(null);

    useEffect(() => {
        const renderPosts = () => {
            setCurrPosts(
                props.posts.map((post, index) => {
                    if (props.search == "") {
                        return (
                            <div
                                key={index}
                                className="flex h-48 min-w-full flex-col items-start justify-evenly rounded-2xl bg-gray-300 p-4 md:items-center"
                            >
                                <h3 className="text-center text-black">
                                    Posted: {props.getTime(post.posted).since}{" "}
                                    {props.getTime(post.posted).multi}
                                </h3>
                                <h2 className="text-center text-xl font-bold text-black">
                                    {post.title}
                                </h2>
                                <h3 className="text-center text-black">
                                    Upvotes: {post.upvotes}
                                </h3>
                            </div>
                        );
                    } else {
                        if (
                            props.search.toLowerCase() ==
                            post.title.toLowerCase()
                        ) {
                            return (
                                <div
                                    key={index}
                                    className="flex h-48 min-w-full flex-col items-start justify-evenly rounded-2xl bg-gray-300 p-4 md:items-center"
                                >
                                    <h3 className="text-center text-black">
                                        Posted:{" "}
                                        {props.getTime(post.posted).since}{" "}
                                        {props.getTime(post.posted).multi}
                                    </h3>
                                    <h2 className="text-center text-xl font-bold text-black">
                                        {post.title}
                                    </h2>
                                    <h3 className="text-center text-black">
                                        Upvotes: {post.upvotes}
                                    </h3>
                                </div>
                            );
                        }
                    }
                })
            );
        };

        renderPosts();
    }, [props.posts, props.search]);

    if (props.posts) {
        return (
            <div className="flex min-h-screen flex-col gap-6 overflow-scroll">
                {currPosts}
            </div>
        );
    } else {
        return <div className="min-h-screen overflow-scroll"></div>;
    }
};

export default Posts;
