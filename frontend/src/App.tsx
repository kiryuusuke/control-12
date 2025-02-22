import MainToolbar from "./components/UI/MainToolbar/MainToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Posts from "./features/posts/Posts.tsx";

const App = () => {
    return (
        <>
            <header>
                <MainToolbar />
            </header>

            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </>
    );
};

export default App;