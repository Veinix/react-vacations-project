import { toast } from "react-toastify";

class NotificationService {

    public default(message: string){
        toast(message)
    }

    public success(message: string): void {
        toast.success(message);
    }
    
    public info(message: string): void {
        toast.info(message)
    }
    
    public warning(message: string): void {
        toast.warn(message)
    }

    public error(err: any): void {
        const message = this.extractMessage(err);
        toast.error(message);
    }

    private extractMessage(err: any): string {
        if(typeof err === "string") return err;
        if(typeof err.response?.data === "string") return err.response.data; // Axios
        if(Array.isArray(err.response?.data)) return err.response.data[0];
        if(typeof err.message === "string") return err.message;
        return "Some error, please try again.";
    }
}

const notificationService = new NotificationService();

export default notificationService;

