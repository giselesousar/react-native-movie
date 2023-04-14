const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export const setUser = (user: { username: string }) => ({
    type: SET_USER,
    payload: user
});

export const clearUser = () => ({
    type: CLEAR_USER
});