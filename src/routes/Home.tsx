import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface Data {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    posted: {
        nanoseconds: number;
        seconds: number;
    };
}
[];

const Home = () => {
    const [posts, setPosts] = useState<Data[]>();
    const postCollection = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollection);
            setPosts(
                data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })) as Data[]
            );
        };

        getPosts();
    }, []);

    if (posts) {
        return (
            <div className="min-h-screen">
                <h1>{posts[0].title}</h1>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default Home;
