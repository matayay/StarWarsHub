import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [year, setYear] = useState(0);
    const [nav, setNav] = useState(false);

    useEffect(() => {
        const calculateYear = () => {
            const date = new Date();
            const curr_year = date.getFullYear();
            setYear(curr_year);
        };

        calculateYear();
    }, []);

    if (!nav) {
        return (
            <div className="min-h-screen">
                <div className="flex h-24 items-center justify-around bg-blue-950 md:justify-evenly">
                    <h1
                        className="cursor-pointer text-3xl font-bold text-white"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Starwars Hub
                    </h1>

                    <div
                        className="flex min-h-full flex-col justify-center gap-2 md:hidden"
                        onClick={() => setNav(true)}
                    >
                        <div className="h-1 w-10 bg-gray-300"></div>
                        <div className="h-1 w-10 bg-gray-300"></div>
                        <div className="h-1 w-10 bg-gray-300"></div>
                    </div>

                    <div className="hidden gap-8 text-white md:flex md:items-center md:justify-center">
                        <h3
                            className="cursor-pointer"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Home
                        </h3>
                        <h3
                            className="cursor-pointer"
                            onClick={() => {
                                navigate("/new");
                            }}
                        >
                            Create New Post
                        </h3>
                    </div>
                </div>

                <Outlet />

                <div className="flex h-20 items-center justify-center bg-gray-900">
                    <h3 className="text-white">© {year} Matayay Karuna</h3>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-screen flex-col items-center gap-16 bg-gray-100 px-4 py-2">
                <div className="flex min-w-full items-center justify-end">
                    <h1
                        className="text-5xl text-gray-600"
                        onClick={() => setNav(false)}
                    >
                        X
                    </h1>
                </div>

                <button
                    className="w-60 rounded bg-blue-900 py-4 text-lg text-white"
                    onClick={() => {
                        setNav(false);
                        navigate("/");
                    }}
                >
                    Home
                </button>
                <button
                    className="w-60 rounded bg-blue-900 py-4 text-lg text-white"
                    onClick={() => {
                        setNav(false);
                        navigate("/new");
                    }}
                >
                    Create New Post
                </button>
            </div>
        );
    }
};

export default Header;
