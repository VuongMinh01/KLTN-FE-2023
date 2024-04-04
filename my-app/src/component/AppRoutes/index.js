import React from "react";
import { Route, Routes } from "react-router-dom";
import KhachHang from '../../pages/KhachHang';
import FullTest from '../../pages/FullTest';
import MiniTest from '../../pages/MiniTest';
import KhuyenMai from '../../pages/KhuyenMai';
import AddingFullTestPage from '../../component/AddingFullTestPage';
import AddingMiniTestPage from '../../component/AddingMiniTestPage';
import AddPart1 from '../../component/AddPart1';
import AddPart2 from '../../component/AddPart2';
import AddPart1Test from '../../component/AddPart1Test';
import Courses from '../../pages/Courses';

export default function AppRoutes() {
    return (
        <Routes>

            {/* <Route path="/tests" element={<KhuyenMai />}></Route> */}
            <Route path="/khachhang" element={<KhachHang />}></Route>
            <Route path="/fulltest" element={<FullTest />}></Route>
            <Route path="/khuyenmai" element={<KhuyenMai />}></Route>
            <Route path="/fulltest/add" element={<AddingFullTestPage />}></Route>
            <Route path="/minitest" element={<MiniTest />}></Route>
            <Route path="/minitest/add" element={<AddingMiniTestPage />}></Route>
            <Route path="/minitest/add/Part1" element={<AddPart1 />}></Route>
            <Route path="/minitest/add/Part2" element={<AddPart2 />}></Route>
            <Route path="/minitest/add/Part3" element={<AddPart1Test />}></Route>
            <Route path="/courses" element={<Courses />}></Route>

        </Routes>
    )
}