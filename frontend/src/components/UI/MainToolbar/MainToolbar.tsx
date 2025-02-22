import {NavLink} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../../app/hooks.ts";
import ExistsUser from "./ExistsUser.tsx";
import UnknownUser from "./UnknownUser.tsx";

const MainToolbar = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
        <>
            <AppBar
                position='sticky'
                sx={{
                    justifyContent: 'center',
                    boxShadow: 'none',
                    bgcolor: 'rgba(4, 4, 4, 0.29)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '15px',
                    mt: '20px'
                }}>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        <NavLink to='/' className='text-decoration-none text-black'>
                            Learn Your Favorite Cocktail
                        </NavLink>
                    </Typography>
                    {user ? (
                        <>
                            <ExistsUser user={user}/>
                        </>
                    ) : (
                        <>
                            <UnknownUser />
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </>
    );
};

export default MainToolbar;