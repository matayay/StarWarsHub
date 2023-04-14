import { FC } from "react";

interface Props {
    buttonName: string;
    title: string;
    content: string;
    image: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: FC<Props> = (props) => {
    return (
        <div className="flex w-screen items-center justify-center md:px-40 lg:px-60 xl:px-80 2xl:px-96">
            <form
                onSubmit={props.handleSubmit}
                className="flex h-96 w-64 flex-col items-start justify-between rounded-xl bg-gray-200 p-8 md:w-full"
            >
                <input
                    type="text"
                    placeholder="Title"
                    required
                    value={props.title}
                    onChange={(e) => {
                        props.setTitle(e.target.value);
                    }}
                    className="min-w-full rounded border-2 border-gray-500"
                />
                <textarea
                    className="h-44 min-w-full rounded border-2 border-gray-500"
                    placeholder="Content (Optional)"
                    value={props.content}
                    onChange={(e) => {
                        props.setContent(e.target.value);
                    }}
                ></textarea>
                <input
                    type="text"
                    placeholder="Image URL (Optional)"
                    value={props.image}
                    onChange={(e) => {
                        props.setImage(e.target.value);
                    }}
                    className="min-w-full rounded border-2 border-gray-500"
                />
                <button
                    className="rounded bg-blue-900 px-2 py-1 text-base text-white md:px-4 md:py-2 md:text-lg"
                    type="submit"
                >
                    {props.buttonName}
                </button>
            </form>
        </div>
    );
};

export default Form;
