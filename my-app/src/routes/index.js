import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Tests from '../pages/Tests'
import AppTest from '../pages/AppTest';
import TuVung from "../pages/TuVung";
import NguPhap from "../pages/NguPhap"

import HienTaiDon from '../component/NguPhapTongHop/HienTaiDon';
import HienTaiTiepDien from '../component/NguPhapTongHop/HienTaiTiepDien';
import HienTaiHoanThanh from '../component/NguPhapTongHop/HienTaiHoanThanh';
import QuaKhuDon from '../component/NguPhapTongHop/QuaKhuDon';
import QuaKhuTiepDien from '../component/NguPhapTongHop/QuaKhuTiepDien';
import QuaKhuHoanThanh from '../component/NguPhapTongHop/QuaKhuHoanThanh';
import TuongLai from '../component/NguPhapTongHop/TuongLai';
import HienTaiHoanThanhTiepDien from '../component/NguPhapTongHop/HienTaiHoanThanhTiepDien';
import QuaKhuHoanThanhTiepDien from '../component/NguPhapTongHop/QuaKhuHoanThanhTiepDien';
const publicRoute = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/tests', component: Tests },
    { path: '/app', component: AppTest },
    { path: '/nguphap', component: NguPhap },
    { path: '/tuvung', component: TuVung },

    { path: '/nguphap/hien-tai-don', component: HienTaiDon },
    { path: '/nguphap/hien-tai-tiep-dien', component: HienTaiTiepDien },
    { path: '/nguphap/hien-tai-hoan-thanh', component: HienTaiHoanThanh },
    { path: '/nguphap/hien-tai-hoan-thanh-tiep-dien', component: HienTaiHoanThanhTiepDien },
    { path: '/nguphap/qua-khu-don', component: QuaKhuDon },
    { path: '/nguphap/qua-khu-tiep-dien', component: QuaKhuTiepDien },
    { path: '/nguphap/qua-khu-hoan-thanh', component: QuaKhuHoanThanh },
    { path: '/nguphap/qua-khu-hoan-thanh-tiep-dien', component: QuaKhuHoanThanhTiepDien },
    { path: '/nguphap/tuong-lai', component: TuongLai },
]

const privateRoute = [
    { path: '/admin', component: Admin },

]
export { publicRoute, privateRoute }