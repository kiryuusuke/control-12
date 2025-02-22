import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Post from "./models/Post";

const run = async() => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('posts');
        await db.dropCollection('users');
    } catch(e) {
        console.log('Collections were not presents, skipping drop');
    }

    const [Marsel, John] = await User.create(
        {
            email: 'msugurbekov@mail.com',
            displayName: 'Marsel',
            userAvatar: 'fixtures/170088022.jpeg',
            password: '8686',
            token: randomUUID(),
            role: 'admin'
        },
        {
            email: 'ryushimaa@gmail.com',
            displayName: 'John',
            userAvatar: 'fixtures/John.png',
            password: '6868',
            token: randomUUID(),
            role: 'user'
        },
    );

    await Post.create(
        {
            title: 'Was so cool',
            author: Marsel._id,
            photo: 'fixtures/beautifulPlace.jpeg'
        },
        {
            title: 'This cocktail is really good',
            author: John._id,
            photo: 'fixtures/cocktail.jpeg'
        }
    );
    await db.close()
};

run().catch(console.error);