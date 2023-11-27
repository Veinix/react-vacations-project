import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Components/RoutingArea/Router";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Components/Common/Loading/Loading";
import interceptors from "./Utilities/interceptors";

interceptors.create();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider 
        router={router} 
        fallbackElement={<Loading message={"Hold on, we're getting there"}/>}
    />
);
