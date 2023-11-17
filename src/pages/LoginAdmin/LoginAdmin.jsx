import * as React from 'react';
import * as authAction from '../../redux/auth/authSlice'
import { useDispatch } from "react-redux";
import { userLogin } from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Loading } from '@nextui-org/react';

function LoginAdmin() {
    const dispatch = useDispatch();
    const [loading, setLoad] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleChangUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePass = (e) => {
        setPassword(e.target.value)
    }
    const login = async ({ username, password }) => {
        const res = await userLogin({ username, password })
        if (res.data.success) {
            if (res.data.data.role === 'ROLE_ADMIN' || res.data.data.role === 'ROLE_STAFF') {
                await dispatch(authAction.login(res.data));
                window.location.href = '/admin'
            } else {
                toast.error('Sai tài khoản hoặc mật khẩu', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setLoad(false)
            }
        }
        else {
            toast.error('Sai tài khoản hoặc mật khẩu', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setLoad(false)
        }
    }
    const handleLogin = () => {
        setLoad(true)
        login({ username, password })
    }
    return (
        
        <div class="bg-gray-300 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
            <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
                <div class="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                </div>
                <form class="p-12 md:p-24">
                    <div class="flex items-center text-lg mb-6 md:mb-8">
                        <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                        </svg>
                        <input type="text" id="email" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" value={username} onChange={handleChangUsername} autoFocus/>
                    </div>
                    <div class="flex items-center text-lg mb-6 md:mb-8">
                        <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        <input type="password" id="password" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" value={password} onChange={handleChangePass} autoFocus/>
                    </div>
                    <button class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded" disabled={(loading || username === '' || password === '') ? true : false} onClick={handleLogin}>
                        {loading ?<Loading color={'currentColor'} type='points-opacity' /> : "Đăng nhập"}
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default LoginAdmin;