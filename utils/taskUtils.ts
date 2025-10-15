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

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isOverdue(task: Task): boolean {
  if (task.is_completed) return false;
  const dueDate = new Date(task.due_date);
  const now = new Date();
  return dueDate < now;
}

export function getTimeRemaining(dateString: string): string {
  const dueDate = new Date(dateString);
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();

  if (diff < 0) return "Atrasado";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} dia${days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours}h`;
  
  const minutes = Math.floor(diff / (1000 * 60));
  return `${minutes}min`;
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  
  return [...tasks].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}

export function filterByPriority(tasks: Task[], priority: Task["priority"]): Task[] {
  return tasks.filter((t) => t.priority === priority);
}

export function searchTasks(tasks: Task[], query: string): Task[] {
  const lowerQuery = query.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.client_name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery)
  );
}
