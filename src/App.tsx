import { Routes, Route } from "react-router-dom";
import Header from "./routes/Header";
import Home from "./routes/Home";
import CreatePost from "./routes/CreatePost";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<CreatePost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
