import MainToolbar from "./components/UI/MainToolbar/MainToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Posts from "./features/posts/Posts.tsx";
import UsersPosts from "./features/posts/UsersPosts.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import UserPostPage from "./features/posts/UserPostPage.tsx";

const App = () => {
    return (
        <>
            <header>
                <MainToolbar />
            </header>

            <Routes>
                <Route path="/" element={<Posts /> } />
                <Route path='/myposts' element={<UsersPosts /> } />
                <Route path='/posts/:userId/userpage' element={<UserPostPage /> } />
                <Route path='/login' element={<LoginPage /> } />
                <Route path='/register' element={<RegisterPage /> } />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </>
    );
};

export default App;