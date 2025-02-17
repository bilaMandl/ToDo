import { Link } from "react-router-dom"
// import Container from "@mui/material/Container";
import { AppBar, Box, Button, Toolbar } from "@mui/material";


export const Nav = () => {
    return <>
            <AppBar position="fixed" sx={{ background: "linear-gradient(to right, peachpuff, #0000ff75)" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Button AppBarcolor="inherit" component={Link} to="/home">דף הבית</Button>
                    </Box>
                    <Box>
                        <Button color="inherit" component={Link} to="/log">התחברות</Button>
                        <Button color="inherit" component={Link} to="/regis">הרשמה</Button>
                    </Box>
                </Toolbar>
            </AppBar>
    </>
}