export interface UserTypes {
    email: string
    password: string
    token: string
    role: string
    displayName: string;
    googleId: string;
    userAvatar: string | null
}

export interface PostTypes {
    title: string;
    author: string;
    photo: string | null;
}