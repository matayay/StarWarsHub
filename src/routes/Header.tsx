import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="flex h-20 items-center justify-around bg-blue-950 md:justify-evenly">
                <h1
                    className="cursor-pointer text-3xl font-bold text-white"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Starwars Hub
                </h1>

                <div className="flex min-h-full flex-col justify-center gap-2 md:hidden">
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
                    <h3 className="cursor-pointer">Create New Post</h3>
                </div>
            </div>

            <Outlet />

            <div className="flex h-40 items-center justify-center bg-gray-900">
                <h3 className="text-white">© 2023 Matayay Karuna</h3>
            </div>
        </div>
    );
};

export default Header;
