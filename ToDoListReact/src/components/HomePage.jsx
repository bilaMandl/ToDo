import { Container, Typography, Box, Button, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <>
 <Container maxWidth="md" sx={{ marginTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    textAlign="center"
                    width="100%"
                >
                    <Typography variant="h2" gutterBottom>
                        Welcome to Our Website!
                    </Typography>
                    <Typography variant="h6" color="textSecondary" paragraph>
                        Discover amazing content and enjoy the best experience with us.
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Box>
            </Container>
        </>
    );
};
