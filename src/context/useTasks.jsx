import { useContext } from "react";
import { TaskContext } from "./taskContext";

export const useTasks = () => useContext(TaskContext);
