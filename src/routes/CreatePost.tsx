import Form from "../components/Form";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const postCollection = collection(db, "posts");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const date = new Date();

        const newData = {
            title: title,
            content: content,
            image: image,
            upvotes: 0,
            posted: Math.round(date.getTime() / 1000),
            comments: [],
        };

        await addDoc(postCollection, newData);
        alert("Post Created");
        setTitle("");
        setContent("");
        setImage("");
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Form
                buttonName="Create Post"
                title={title}
                content={content}
                image={image}
                setTitle={setTitle}
                setContent={setContent}
                setImage={setImage}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreatePost;
