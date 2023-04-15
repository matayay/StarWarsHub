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
import { useParams } from "react-router-dom";
import { Data } from "../routes/Home";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Details = () => {
    let params = useParams();
    const id: string = params.id as string;
    const [postData, setPostData] = useState<Data>();
    const [read, setRead] = useState(0);
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const postRef = doc(db, "posts", id);
            const postSnap = await getDoc(postRef);
            setPostData(postSnap.data() as Data);
        };

        getPost();
    }, [read]);

    const handleUpvote = async (upvotes: number) => {
        const postRef = doc(db, "posts", id);
        await updateDoc(postRef, { upvotes: upvotes + 1 });
        setRead(read + 1);
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async () => {
        const postRef = doc(db, "posts", id);
        await deleteDoc(postRef);
        alert("Post Deleted");
        navigate("/");
    };

    const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (comment != "" && postData) {
            const postRef = doc(db, "posts", id);
            let postArray = [...postData.comments, comment];
            await updateDoc(postRef, { comments: postArray });

            setComment("");
            setRead(read + 1);
        }
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

    if (postData) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 md:px-20">
                <div className="flex max-h-full min-w-full flex-col items-start justify-center gap-10 rounded-xl bg-gray-200 px-4 py-6">
                    <h3 className="text-left text-black md:text-lg">
                        Posted: {getTime(postData.posted).since}{" "}
                        {getTime(postData.posted).multi}
                    </h3>
                    <h1 className="text-left font-bold text-black md:text-3xl">
                        {postData.title}
                    </h1>
                    <h2 className="text-left text-black md:text-xl">
                        {postData.content}
                    </h2>
                    <img
                        className="h-auto w-60 md:w-96 lg:w-2/4"
                        src={postData.image}
                        alt="post image"
                    />

                    <div className="flex min-w-full items-center justify-between">
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className="cursor-pointer"
                                onClick={() => handleUpvote(postData.upvotes)}
                            >
                                👍
                            </div>
                            <h3>Upvotes: {postData.upvotes}</h3>
                        </div>

                        <div className="flex items-center justify-center gap-6">
                            <div
                                onClick={handleEdit}
                                className="cursor-pointer"
                            >
                                ✏️
                            </div>
                            <div
                                onClick={handleDelete}
                                className="cursor-pointer"
                            >
                                🗑️
                            </div>
                        </div>
                    </div>

                    <div className="item-center flex min-w-full flex-col justify-center rounded bg-white px-2 py-4">
                        <div className="flex min-w-full flex-col items-start justify-center overflow-scroll">
                            {postData.comments.map((value, index) => (
                                <h2
                                    className="text-left text-black"
                                    key={index}
                                >
                                    - {value}
                                </h2>
                            ))}
                        </div>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder="Leave a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="min-w-full rounded border-2 border-gray-200"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-screen items-center justify-center"></div>
        );
    }
};

export default Details;
