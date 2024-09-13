import React from "react";
import Navbar from './navbar.tsx';
import Users from './Users.tsx';
import {Routes, Route,} from "react-router-dom";
import UserCreate from "./UsersCreate.tsx";
import { BrowserRouter } from "react-router-dom";
import UsersUpdate from "./UsersUpdate.tsx";

function Home() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Users/>} />
                <Route path="/create" element={<UserCreate/>} />
                <Route path="/update/:id" element={<UsersUpdate/>} />
            </Routes>
        </>
    )
}

export default Home