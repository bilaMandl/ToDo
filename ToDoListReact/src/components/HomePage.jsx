import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <Container
            maxWidth="md"
            sx={{
                height: "100vh", // מבטיח שהתוכן יתפשט לגובה 100% מהמסך
                margin: 0, // מבטל כל מרווח של למעלה, למטה, או צדדים
                display: "flex", // שימוש ב-flexbox
                justifyContent: "center", // ממקם את התוכן במרכז אופקית
                alignItems: "center", // ממקם את התוכן במרכז אנכית
                overflow: "hidden", // מבטל גלילה
                backgroundColor: "#f5f7fa", // רקע צבעי ניטרלי בהיר
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    width: "100%",
                    maxWidth: 600, // מגביל את הרוחב של ה-Box
                    padding: 4,
                    bgcolor: "white",
                    boxShadow: 6,
                    borderRadius: 5,
                    display: "flex", // שימוש ב-flexbox בתוך ה-Box
                    flexDirection: "column", // אלמנטים ממורכזים כלפי למעלה
                    justifyContent: "center", // ממקם את התוכן במרכז אנכית בתוך ה-Box
                    alignItems: "center", // ממקם את התוכן במרכז אופקית בתוך ה-Box
                    transition: "all 0.3s ease", // אנימציה חלקה בעת מעבר על ה-Box
                    "&:hover": {
                        boxShadow: 10, // הגדלת הצל במהלך ההעברה
                        transform: "scale(1.05)", // יגדיל את ה-Box מעט
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "primary.main", // השתמשתי בצבע ראשי לדגש
                        fontSize: "2.5rem", // גודל גופן גדול יותר
                    }}
                >
                    ברוכים הבאים לניהול המשימות!
                </Typography>
                <Typography
                    variant="h5"
                    color="textSecondary"
                    paragraph
                    sx={{ mb: 3, fontSize: "1.2rem" }}
                >
                    ארגנו את המשימות שלכם בקלות וייעלו את היום שלכם.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/regis"
                        sx={{
                            fontSize: "1.2rem",
                            px: 5,
                            py: 1.5,
                            borderRadius: 50, // כפתור עם קצוות מעוגלים יותר
                            background: "linear-gradient(to right, peachpuff, #0000ff75)", // רקע צבע כשלך
                            boxShadow: 3,
                            color: "white", // טקסט לבן כדי להתאים לצבע הרקע
                            "&:hover": {
                                background: "linear-gradient(to right, #0000ff75, peachpuff)", // שינוי צבע בהובר
                                boxShadow: 6,
                            },
                        }}
                    >
                        התחל עכשיו
                    </Button>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/log"
                        sx={{
                            fontSize: "1.2rem",
                            px: 5,
                            py: 1.5,
                            borderRadius: 50, // כפתור עם קצוות מעוגלים יותר
                            borderColor: "primary.main",
                            color: "primary.main",
                            "&:hover": {
                                backgroundColor: "primary.main",
                                borderColor: "primary.main",
                                color: "white",
                            },
                        }}
                    >
                        יש לי חשבון
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
