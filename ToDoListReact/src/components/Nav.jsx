import { Link } from "react-router-dom"
import Container from "@mui/material/Container";


export const Nav = () => {
    return <>
            <nav className="navbar navbar-inverse" style={{ background: "linear-gradient(to right, peachpuff,  #0000ff75)"}}>
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to={'home'} style={{ color: "black" }}>דף הבית</Link></li>
                    </ul>
                    <ul className="nav navbar-nav ">
                        <li><Link to={'log'} style={{ color: "black" }}>התחברות</Link></li>
                        <li><Link to={'regis'} style={{ color: "black" }}>הרשמה</Link></li>
                    </ul>
                </div>
            </nav>
    </>
}