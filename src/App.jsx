import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { TaskProvider } from "./context/TaskProvider";

const App = () => {
  return (
    <TaskProvider>
      <ToastContainer />
      <AppRoutes />
    </TaskProvider>
  );
};

export default App;
