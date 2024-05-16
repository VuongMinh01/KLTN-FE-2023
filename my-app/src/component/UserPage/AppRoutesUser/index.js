import React from "react";
import { Route, Routes } from "react-router-dom";

import Verify from "../../VerifyPage";
import ChangePassword from "../../ChangePassword";
import InformUser from "../../InformUser";
import ScorecardDetail from "../../ScoreDetail";
export default function AppRoutesUser() {
    return (
        <Routes>

            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/changePassword" element={<ChangePassword />}></Route>
            <Route path="/informUser" element={<InformUser />}></Route>
            <Route path="/scorecards" element={<ScorecardDetail />}></Route>


        </Routes >
    )
}