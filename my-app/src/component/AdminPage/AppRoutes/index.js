import React from "react";
import { Route, Routes } from "react-router-dom";
import FullTest from '../../../pages/FullTest';
import Reading from '../../../pages/Reading';
import AddingFullTestPage from '../../AddingFullTestPage';
import AddingMiniTestPage from '../../AddingMiniTestPage';
import AddPart1 from '../../AddPart1';
import AddPart2 from '../../AddPart2';
import AddPart1Test from '../../AddPart1Test';
import Courses from '../../../pages/Courses';
import Verify from "../../VerifyPage";
import Listening from "../../../pages/Listening";
import HocVien from "../../../pages/HocVien";
export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/fulltest" element={<FullTest />}></Route>
            <Route path="/fulltest/add" element={<AddingFullTestPage />}></Route>
            <Route path="/reading" element={<Reading />}></Route>
            <Route path="/listening" element={<Listening />}></Route>

            <Route path="/minitest/add" element={<AddingMiniTestPage />}></Route>
            <Route path="/minitest/add/Part1" element={<AddPart1 />}></Route>
            <Route path="/minitest/add/Part2" element={<AddPart2 />}></Route>
            <Route path="/minitest/add/Part3" element={<AddPart1Test />}></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/hocvien" element={<HocVien />}></Route>

        </Routes>
    )
}