import config from "./config";
import path from 'path'
import {promises as fs} from 'fs'
import {randomUUID} from "node:crypto";
import multer from "multer";

const imageStorage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        const destDIr = path.join(config.publicPath, 'images');
        await fs.mkdir(destDIr, {recursive: true});
        cb(null, destDIr);
    },
    filename: (_req, file, cb) => {
        const ex = path.extname(file.originalname);
        cb(null,randomUUID() + ex);
    }
});

export const imagesUpload = multer({storage: imageStorage})