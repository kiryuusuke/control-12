import {ChangeEvent, FormEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import FileInput from "../UI/FileInput/FileInput.tsx";
import {CloudUpload} from "@mui/icons-material";
import {PostMutation} from "../../typesUI.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {addPost} from "../../store/thunks/postThunk.ts";
import {useNavigate} from "react-router-dom";


const PostForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form , setForm] = useState<PostMutation>({
        title: '',
        author: '',
        photo: null
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files[0]) {
            setForm((prev) => ({
                ...prev,
                photo: files![0]
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addPost(form));
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>

            <TextField
                label="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />

            <FileInput
                fullWidth
                label="Image"
                name="photo"
                buttonText="Choose file"
                buttonProps={{startIcon: <CloudUpload/>}}
                onChange={handleFileChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                Create
            </Button>
        </form>
    );
};

export default PostForm;