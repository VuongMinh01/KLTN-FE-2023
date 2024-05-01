import React from "react";
import { Route, Routes } from "react-router-dom";
import FullTest from '../../../pages/FullTest';
import Reading from '../../../pages/Reading';

import Courses from '../../../pages/Courses';
import Verify from "../../VerifyPage";
import Listening from "../../../pages/Listening";
import HocVien from "../../../pages/HocVien";
export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/fulltest" element={<FullTest />}></Route>
            <Route path="/reading" element={<Reading />}></Route>
            <Route path="/listening" element={<Listening />}></Route>

            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/hocvien" element={<HocVien />}></Route>

        </Routes>
    )
}