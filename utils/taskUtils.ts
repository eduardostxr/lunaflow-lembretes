import { Task } from "../types/task";

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function getTodaysTasks(tasks: Task[]): Task[] {
  return tasks.filter((t) => isToday(t.due_date));
}
