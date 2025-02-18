import { Link } from "react-router-dom"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Nav = () => {
    return <>
        <AppBar position="fixed" sx={{
            background: "linear-gradient(to right, peachpuff, #0000ff75)", padding: "10px"
        }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#444" }}>
                    רשימת המשימות שלי
                </Typography>
                <Box sx={{ display: "flex", gap: "15px" }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/home"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        דף הבית
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/log"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        התחברות
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/regis"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        הרשמה
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    </>
}