import React from "react";
import { Route, Routes } from "react-router-dom";

import AddingMiniTestPage from '../../../component/AddingMiniTestPage';
import Part1 from '../../../component/Part1';
import Part2 from '../../../component/Part2';
import Part3Q1 from "../../../component/Part3/Part3Q1";
import Part3Q2 from "../../Part3/Part3Q2";
export default function AppRoutesUser() {
    return (
        <Routes>


            <Route path="/minitest" element={<AddingMiniTestPage />}></Route>
            <Route path="/test1/part1" element={<Part1 />}></Route>
            <Route path="/test1/part2" element={<Part2 />}></Route>
            <Route path="/test1/part3/q1" element={<Part3Q1 />}></Route>
            <Route path="/test1/part3/q2" element={<Part3Q2 />}></Route>

        </Routes >
    )
}