export interface Task {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
  completed_at?: string;
  priority: "high" | "medium" | "low";
  created_at: string;
  updated_at: string;
}
