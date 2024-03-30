import React from "react";
import { Route, Routes } from "react-router-dom";

import AddingMiniTestPage from '../../../component/AddingMiniTestPage';
import AddPart1 from '../../../component/AddPart1';

export default function AppRoutesUser() {
    return (
        <Routes>

            {/* <Route path="/tests" element={<KhuyenMai />}></Route> */}
            {/* <Route path="/Part" element={<KhuyenMai />}></Route> */}
            <Route path="/minitest" element={<AddingMiniTestPage />}></Route>
            <Route path="/part1" element={<AddPart1 />}></Route>

        </Routes>
    )
}