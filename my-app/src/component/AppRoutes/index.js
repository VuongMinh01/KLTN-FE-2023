import React from "react";
import { Route, Routes } from "react-router-dom";
import KhachHang from '../../pages/KhachHang'
import FullTest from '../../pages/FullTest'
import KhuyenMai from '../../pages/KhuyenMai'

export default function AppRoutes() {
    return (
        <Routes>

            {/* <Route path="/tests" element={<KhuyenMai />}></Route> */}
            <Route path="/khachhang" element={<KhachHang />}></Route>
            <Route path="/fulltest" element={<FullTest />}></Route>
            <Route path="/khuyenmai" element={<KhuyenMai />}></Route>


        </Routes>
    )
}