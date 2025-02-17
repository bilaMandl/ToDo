import { Route, Routes } from "react-router-dom"
import { HomePage } from "./HomePage"
import { Register } from "./Register"
import { Login } from "./Login"
import Task from "./Task"

export const Routing = () => {
    return <>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="home" element={<HomePage></HomePage>}></Route>
            <Route path="log" element={<Login></Login>}></Route>
            <Route path="regis" element={<Register></Register>}></Route>
            <Route path="task" element={<Task></Task>}></Route>
        </Routes>
    </>
}