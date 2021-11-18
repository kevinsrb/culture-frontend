import axios from 'axios'
import { GLOBAL_URL } from './constants'

// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const httpClient = axios.create({
    baseURL: `${GLOBAL_URL}/api/`,
});

export async function apiCall(method, url, data, header = { 'Content-Type': 'application/json' }) {
    // if (window.navigator.onLine) {
    try {
        const response = await httpClient({
            method,
            url,
            data,
            headers: header,
            withCredentials: false
        })
        //console.log(`${url}: `, response);
        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                return error.response;
            } else {
                return error.response;
            }
        } else {
            console.log('Error message : ', error.message);
            console.log('Error request : ', error.request)
            return { data: { status: 500, message: 'Internal server error' } }
        }
        // } else if (error.request) {
        //     // console.log('Error request : ', error.request);
    }
    // } else {
    //     return { data: { status: 500, message: 'No internet connection' } }
    // }
}


export const successToast = (msg) => {
    toast.success(msg, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export const errorToast = (msg) => {
    toast.error(msg, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export const warnToast = (msg) => {
    toast.warn(msg, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export const infoToast = (msg) => {
    toast.info(msg, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}