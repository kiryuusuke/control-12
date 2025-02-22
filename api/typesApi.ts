export interface UserTypes {
    email: string
    password: string
    token: string
    role: string
    displayName: string;
    googleId: string;
    userAvatar: string | null
}

export interface Post {
    _id: string;
    title: string;
    photo: string | null;
}