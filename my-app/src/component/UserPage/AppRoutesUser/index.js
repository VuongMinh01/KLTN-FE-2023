import React from "react";
import { Route, Routes } from "react-router-dom";

import Verify from "../../VerifyPage";
import ChangePassword from "../../ChangePassword";
import InformUser from "../../InformUser";
export default function AppRoutesUser() {
    return (
        <Routes>

            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/changePassword" element={<ChangePassword />}></Route>
            <Route path="/informUser" element={<InformUser />}></Route>


        </Routes >
    )
}