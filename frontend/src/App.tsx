import MainToolbar from "./components/UI/MainToolbar/MainToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Posts from "./features/posts/Posts.tsx";
import UsersPosts from "./features/posts/UsersPosts.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import UserPostPage from "./features/posts/UserPostPage.tsx";
import PostForm from "./components/PostForm/PostForm.tsx";
import ProtectedRoute from "./features/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import AdminLayout from "./features/admin/AdminLayout/AdminLayout.tsx";
import AdminPosts from "./features/admin/AdminPosts.tsx";

const App = () => {
    const user = useAppSelector((state) => state.users.user);
    return (
        <>
            <header>
                <MainToolbar />
            </header>

            <Routes>
                <Route path="/" element={<Posts /> } />
                <Route path='/myposts' element={<UsersPosts /> } />
                <Route path='/addPost' element={<PostForm /> } />
                <Route path='/posts/:userId/userpage' element={<UserPostPage /> } />
                <Route path='/login' element={<LoginPage /> } />
                <Route path='/register' element={<RegisterPage /> } />

                <Route path='/admin' element={
                    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route path='posts' element={<AdminPosts /> } />
                </Route>

                <Route path="*" element={<p>404</p>} />
            </Routes>
        </>
    );
};

export default App;