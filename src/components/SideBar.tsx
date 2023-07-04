import { Link } from "react-router-dom";
import XIcon from "./XIcon";
import { FC } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";

interface Props {
    showSideBar: boolean;
    setShowSideBar: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<Props> = (props) => {
    return (
        <div
            className={`fixed right-0 top-0 z-40 flex h-screen w-3/4 flex-col gap-20 bg-neutral-200 p-4 duration-500 ease-in-out ${
                props.showSideBar ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex justify-end">
                {/* Button to exit side bar */}
                <button
                    className="cursor-pointer text-6xl text-gray-500"
                    onClick={() => props.setShowSideBar(false)}
                >
                    <XIcon />
                </button>
            </div>

            {/* Sidebar links, same as navbar links */}
            <nav className="flex flex-col items-center justify-center gap-16">
                <Link
                    onClick={() => props.setShowSideBar(false)}
                    to="/"
                    className="w-40 bg-blue-800 py-4 text-center text-white"
                >
                    Home
                </Link>
                <Link
                    onClick={() => props.setShowSideBar(false)}
                    to="/new"
                    className="w-40 bg-blue-800 py-4 text-center text-white"
                >
                    Create New Post
                </Link>
            </nav>
        </div>
    );
};

export default SideBar;
