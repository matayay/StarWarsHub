import Form from "../components/Form";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

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
