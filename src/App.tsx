import { Routes, Route } from "react-router-dom";
import Header from "./routes/Header";
import Home from "./routes/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
