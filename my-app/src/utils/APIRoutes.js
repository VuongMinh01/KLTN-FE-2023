const host = "https://toeictesting247api.io.vn";

// export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/users/login`;
export const loginWithGmailRoute = `${host}/users/login`;
export const registerRoute = `${host}/users/register`;

// export const checkPhoneExistRoute = `${host}/api/auth/checkPhoneTonTai`;
// export const forgotPasswordRoute = `${host}/api/auth/doiMatKhau`;

// export const getAllProducts = () => {
//     return fetch('https://dummyjson.com/products').then(res => res.json());
// }


// export const getAllService = () => {
//     return fetch('http://localhost:4001/api/service/getAllService').then(res => res.json())
// }
// export const getAllEmployee = () => {
//     return fetch('http://localhost:4001/api/employee/getAllEmployee').then(res => res.json())
// }
export const getAllCustomer = () => {
    return fetch('http://localhost:4001/api/customer/getAllCustomer').then(res => res.json())
}
export const getAllCourses = `${host}/courses/list`;

export const getCustomerById = `${host}/api/customer/getCustomerById`;
export const addCustomer = `${host}/tests/`;
export const addCourses = `${host}/courses/`;

export const getAllCoupon = () => {
    return fetch('http://localhost:4001/api/coupon/getAllCoupon').then(res => res.json())
}
export const deleteCoupon = `${host}/api/coupon/deleteCoupon/:couponId`;
export const updateCoupon = `${host}/api/coupon/updateCoupon/:couponId`;
export const addCoupon = `${host}/api/coupon/addCoupon`;

// export const getAllCar = () => {
//     return fetch('http://localhost:4001/api/car/getAllCar').then(res => res.json())
// }

export const getUser = `${host}/users/me`;