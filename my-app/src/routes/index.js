import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Tests from '../pages/Tests'
import AppTest from '../pages/AppTest';
const publicRoute = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/tests', component: Tests },
    { path: '/app', component: AppTest },

]

const privateRoute = [
    { path: '/admin', component: Admin },

]
export { publicRoute, privateRoute }