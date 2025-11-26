import { NewReminder, Reminder } from '../types/task';
import { API_CONFIG } from '../utils/config';

const BASE_URL = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.REMINDERS;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
};

export const getAllReminders = async (): Promise<Reminder[]> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    throw error;
  }
};

export const getReminderById = async (id: number): Promise<Reminder> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching reminder ${id}:`, error);
    throw error;
  }
};

export const getRemindersByContact = async (contactId: string): Promise<Reminder[]> => {
  try {
    const response = await fetch(`${BASE_URL}?contactId=${contactId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching reminders for contact ${contactId}:`, error);
    throw error;
  }
};

export const createReminder = async (reminder: NewReminder): Promise<Reminder> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminder),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw error;
  }
};

export const updateReminder = async (
  id: number,
  updates: Partial<Reminder>
): Promise<Reminder> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating reminder ${id}:`, error);
    throw error;
  }
};

export const toggleReminderComplete = async (
  id: number,
  completed: boolean
): Promise<Reminder> => {
  try {
    const updates: Partial<Reminder> = {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    };
    
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error toggling reminder ${id}:`, error);
    throw error;
  }
};

export const deleteReminder = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting reminder ${id}:`, error);
    throw error;
  }
};

export const getTodaysReminders = async (): Promise<Reminder[]> => {
  try {
    const allReminders = await getAllReminders();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return allReminders.filter(reminder => {
      const dueDate = new Date(reminder.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    });
  } catch (error) {
    console.error('Error fetching today\'s reminders:', error);
    throw error;
  }
};

export const getPendingReminders = async (): Promise<Reminder[]> => {
  try {
    const allReminders = await getAllReminders();
    return allReminders.filter(reminder => !reminder.completed);
  } catch (error) {
    console.error('Error fetching pending reminders:', error);
    throw error;
  }
};
