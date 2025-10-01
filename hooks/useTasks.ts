import { useState } from "react";
import remindersData from "../db.json";
import { Task } from "../types/task";
import { getTodaysTasks } from "../utils/taskUtils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(remindersData.reminder as Task[]);

  const todaysTasks = getTodaysTasks(tasks);
  const incompleteTasks = todaysTasks.filter((t) => !t.is_completed);
  const completedTasks = todaysTasks.filter((t) => t.is_completed);

  const toggleComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, is_completed: !t.is_completed, completed_at: !t.is_completed ? new Date().toISOString() : undefined }
          : t
      )
    );
  };

  return { tasks, todaysTasks, incompleteTasks, completedTasks, toggleComplete };
}
