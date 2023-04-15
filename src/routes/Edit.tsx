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
import Form from "../components/Form";
import { async } from "@firebase/util";

const Edit = () => {
    let params = useParams();
    const id: string = params.id as string;
    const [postData, setPostData] = useState<Data>();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const postRef = doc(db, "posts", id);
            const postSnap = await getDoc(postRef);
            setPostData(postSnap.data() as Data);
        };

        getPost();
    }, []);

    useEffect(() => {
        if (postData) {
            setTitle(postData.title);
            setContent(postData.content);
            setImage(postData.image);
        }
    }, [postData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const postRef = doc(db, "posts", id);
        await updateDoc(postRef, {
            title: title,
            content: content,
            image: image,
        });

        alert("Post Updated");
        navigate(`/details/${id}`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Form
                buttonName="Update Post"
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

export default Edit;
