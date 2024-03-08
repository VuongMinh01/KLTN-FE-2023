import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Tests from '../pages/Tests'
const publicRoute = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/admin', component: Admin },
    { path: '/test', component: Tests },

]


export { publicRoute }