// Tipos baseados na tabela reminders do banco PostgreSQL
export interface Reminder {
  id: number;
  contactId: string;
  title: string;
  description: string | null;
  dueDate: string; // timestamp ISO
  completed: boolean;
  autoSend: boolean;
  messageTemplate: string | null;
  scheduledSendDate: string | null; // timestamp ISO
  messageSent: boolean;
  sentAt: string | null; // timestamp ISO
  createdBy: string;
  createdAt: string; // timestamp ISO
  completedAt: string | null; // timestamp ISO
}

export interface NewReminder {
  contactId: string;
  title: string;
  description?: string | null;
  dueDate: string;
  completed?: boolean;
  autoSend?: boolean;
  messageTemplate?: string | null;
  scheduledSendDate?: string | null;
  messageSent?: boolean;
  sentAt?: string | null;
  createdBy: string;
  completedAt?: string | null;
}

// Manter Task para compatibilidade com código existente (será removido gradualmente)
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
