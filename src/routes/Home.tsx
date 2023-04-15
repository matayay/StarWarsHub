import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";

export interface Data {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    posted: number;
    image: string;
    comments: string[];
}
[];

const Home = () => {
    const [posts, setPosts] = useState<Data[]>();
    const postCollection = collection(db, "posts");
    const [recent, setRecent] = useState(false);
    const [recentStyle, setRecentStyle] = useState("brightness-100");
    const [popular, setPopular] = useState(true);
    const [popularStyle, setPopularStyle] = useState("brightness-200");
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollection);
            let postsTemp = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as Data[];

            if (!recent && popular) {
                let postsCopy = [...postsTemp];
                postsCopy.sort((a, b) => b.upvotes - a.upvotes);
                setPosts(postsCopy);
            } else if (recent && !popular) {
                let postsCopy = [...postsTemp];
                postsCopy.sort((a, b) => b.posted - a.posted);
                setPosts(postsCopy);
            }
        };

        getPosts();
    }, []);

    useEffect(() => {
        const filterPosts = () => {
            if (posts) {
                if (!recent && popular) {
                    let postsCopy = [...posts];
                    postsCopy.sort((a, b) => b.upvotes - a.upvotes);
                    setPosts(postsCopy);
                } else if (recent && !popular) {
                    let postsCopy = [...posts];
                    postsCopy.sort((a, b) => b.posted - a.posted);
                    setPosts(postsCopy);
                }
            }
        };

        filterPosts();
    }, [recent, popular]);

    const handleRecent = () => {
        setPopular(false);
        setPopularStyle("brightness-100");
        setRecent(true);
        setRecentStyle("brightness-200");
    };

    const handlePopular = () => {
        setRecent(false);
        setRecentStyle("brightness-100");
        setPopular(true);
        setPopularStyle("brightness-200");
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearch(value);
    };

    const getTime = (seconds: number) => {
        const curr_time = new Date();
        const curr_seconds = Math.round(curr_time.getTime() / 1000);

        const secs = curr_seconds - seconds;
        const minutes = secs / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4;
        const years = months / 12;

        if (Math.round(years) >= 1) {
            let fix: string;
            if (Math.round(years) == 1) {
                fix = "year ago";
            } else {
                fix = "years ago";
            }

            const date = {
                since: Math.round(years),
                multi: fix,
            };

            return date;
        } else if (Math.round(months) >= 1) {
            let fix: string;
            if (Math.round(months) == 1) {
                fix = "month ago";
            } else {
                fix = "months ago";
            }

            const date = {
                since: Math.round(months),
                multi: fix,
            };

            return date;
        } else if (Math.round(weeks) >= 1) {
            let fix: string;
            if (Math.round(weeks) == 1) {
                fix = "week ago";
            } else {
                fix = "weeks ago";
            }

            const date = {
                since: Math.round(weeks),
                multi: fix,
            };

            return date;
        } else if (Math.round(days) >= 1) {
            let fix: string;
            if (Math.round(days) == 1) {
                fix = "day ago";
            } else {
                fix = "days ago";
            }

            const date = {
                since: Math.round(days),
                multi: fix,
            };

            return date;
        } else if (Math.round(hours) >= 1) {
            let fix: string;
            if (Math.round(hours) == 1) {
                fix = "hour ago";
            } else {
                fix = "hours ago";
            }

            const date = {
                since: Math.round(hours),
                multi: fix,
            };

            return date;
        } else if (Math.round(minutes) >= 1) {
            let fix: string;
            if (Math.round(minutes) == 1) {
                fix = "minute ago";
            } else {
                fix = "minutes ago";
            }

            const date = {
                since: Math.round(minutes),
                multi: fix,
            };

            return date;
        } else {
            let fix: string;
            if (Math.round(secs) == 1) {
                fix = "second ago";
            } else {
                fix = "seconds ago";
            }

            const date = {
                since: Math.round(secs),
                multi: fix,
            };

            return date;
        }
    };

    if (posts) {
        return (
            <div className="min-h-screen px-4 md:px-20">
                <div className="my-8 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-evenly">
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                        <h3 className="text-xs md:text-lg">Order By:</h3>
                        <button
                            className={`rounded bg-blue-900 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-lg ${recentStyle}`}
                            onClick={handleRecent}
                        >
                            Newest
                        </button>
                        <button
                            className={`rounded bg-blue-900 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-lg ${popularStyle}`}
                            onClick={handlePopular}
                        >
                            Most Popular
                        </button>
                    </div>

                    <form
                        className="flex items-center justify-center"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="search"
                            placeholder="enter search"
                            className="rounded bg-gray-200 md:px-2 md:py-2"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button className="rounded bg-blue-900 px-2 py-1 text-xs text-white md:px-2 md:py-2 md:text-lg">
                            Search
                        </button>
                    </form>
                </div>

                <Posts posts={posts} search={search} getTime={getTime} />
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default Home;
