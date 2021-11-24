//Sweetalert
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

export const ObjNotificaciones = {

    MSG_SUCCESS: async (icon: any, title: any) => {
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        });
    },
    MSG_ERROR: async (icon: any, title: any, text: any) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        })
    }





}