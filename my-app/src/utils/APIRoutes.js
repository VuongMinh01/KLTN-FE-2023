const host = "https://toeictesting247api.io.vn";

export const loginRoute = `${host}/users/login`;
export const loginWithGmailRoute = `${host}/users/login`;
export const registerRoute = `${host}/users/register`;

export const verifyEmail = `${host}/users/verify-email`;

export const getAllCourses = `${host}/courses/list`;
export const getAllTestReading = `${host}/tests/list/660e9e7ebcacb7dfe482795f`;
export const getAllTestListening = `${host}/tests/list/66101219bcacb7dfe4827987`;
export const getAllFullTest = `${host}/tests/list/66191b699815e0b81e1de733`;
export const getAllHocVien = `${host}/users/list`;
export const getTestId = `${host}/tests/`;

export const addCourses = `${host}/courses/`;
export const addTest = `${host}/tests/`;
export const addQuestion = `${host}/questions/`;

export const deleteCourses = `${host}/courses/delete`
export const deleteTest = `${host}/tests/delete`
export const deleteQuestion = `${host}/questions/delete`
export const getUser = `${host}/users/me`;
export const changePassword = `${host}/users/change-password`;
export const forgotPassword = `${host}/users/forgot-password`;
export const verifyForgotPassword = `${host}/users/verify-forgot-password`;
export const resetPassword = `${host}/users/reset-password`;
export const getQuestionList = `${host}/questions/list`
export const getQuestionListId = `${host}/questions/list/:test_id`

export const updateUser = `${host}/users/me`;
export const updateQuestion = `${host}/questions/update`;
export const updateTest = `${host}/tests/update`;
export const submitTest = `${host}/scorecards/`;
export const getScore = `${host}/scorecards`;
export const searchUser = `${host}/search/user`
export const uploadImageEndpoint = `${host}/medias/upload-image`;
export const uploadAudioEndpoint = `${host}/medias/upload-audio`