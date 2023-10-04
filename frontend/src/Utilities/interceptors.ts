import axios from "axios";

class Interceptors {

    // Create app interceptors:
    public create(): void {

        // Registering to request interceptor:
        axios.interceptors.request.use(requestObject => {

            // requestObject containing data send with any request.

            // if(authStore.getState().token) {
            //     requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
            //     requestObject.headers.doormanKey = "I-Love-Kittens!";
            // }

            return requestObject;
        });
        
    }
}

const interceptors = new Interceptors();

export default interceptors;