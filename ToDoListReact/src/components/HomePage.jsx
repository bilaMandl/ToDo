import { Container, Typography, Box, Button, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: "80px", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            padding: 4,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}>
            ברוכים הבאים לניהול המשימות!
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            ארגנו את המשימות שלכם בקלות וייעלו את היום שלכם.
          </Typography>
      
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button variant="contained" component={Link} to="/regis" color="primary" size="large" sx={{ fontSize: "1.2rem", px: 4 }}>
              התחל עכשיו
            </Button>
            <Button variant="outlined" component={Link} to="/log" color="primary" size="large" sx={{ fontSize: "1.2rem", px: 4 }}>
              יש לי חשבון
            </Button>
          </Box>
        </Box>
      </Container>      
    );
};
