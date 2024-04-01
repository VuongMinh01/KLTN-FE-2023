import React from "react";
import { Route, Routes } from "react-router-dom";

import AddingMiniTestPage from '../../../component/AddingMiniTestPage';
import Part1 from '../../../component/Part1';
import Part2 from '../../../component/Part2';
import Part3 from '../../../component/Part3';

export default function AppRoutesUser() {
    return (
        <Routes>

            {/* <Route path="/tests" element={<KhuyenMai />}></Route> */}
            {/* <Route path="/Part" element={<KhuyenMai />}></Route> */}
            <Route path="/minitest" element={<AddingMiniTestPage />}></Route>
            <Route path="/test1/part1" element={<Part1 />}></Route>
            <Route path="/test1/part2" element={<Part2 />}></Route>
            <Route path="/test1/part3/q1" element={<Part3 />}></Route>

        </Routes>
    )
}