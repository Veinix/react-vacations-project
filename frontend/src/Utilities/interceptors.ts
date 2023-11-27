import axios from "axios";
import { authStore } from "../Redux/authState";

class Interceptors {

    // Request Interceptors
    public create(): void {
        axios.interceptors.request.use(requestObject => {

            if (authStore.getState().token) {
                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
            }
            return requestObject;
        });
    }

    // Response Interceptors
}

const interceptors = new Interceptors();
export default interceptors;