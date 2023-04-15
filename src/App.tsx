import { Routes, Route } from "react-router-dom";
import Header from "./routes/Header";
import Home from "./routes/Home";
import CreatePost from "./routes/CreatePost";
import Details from "./routes/Details";
import Edit from "./routes/Edit";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<CreatePost />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
