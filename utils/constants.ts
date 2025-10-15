export const COLORS = {
  // Backgrounds
  background: "#f5f3e7",
  cardBackground: "#e2d6c3",
  cardBackgroundDark: "#d4c8b5",
  white: "#fff",

  // Textos
  textPrimary: "#3b2a2a",
  textSecondary: "#6b5a4a",
  textTertiary: "#9ca3af",
  textDisabled: "#d1c5b3",

  // Ações
  primary: "#6b5a4a",
  primaryDark: "#8C3432",

  // Status
  success: "#10b981",
  warning: "#f59e0b",
  error: "#dc2626",
  info: "#3b82f6",

  // Prioridades
  priorityHigh: "#dc2626",
  priorityMedium: "#f59e0b",
  priorityLow: "#10b981",

  // Bordas e divisores
  border: "#d1c5b3",
  divider: "#d1c5b3",

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
  xxxl: 32,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export const PRIORITY_LABELS = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
} as const;

export const ERROR_MESSAGES = {
  EMPTY_TITLE: "O título é obrigatório",
  EMPTY_CLIENT: "O nome do cliente é obrigatório",
  EMPTY_DATE: "Data e hora são obrigatórias",
  EMPTY_EMAIL: "Digite email e senha",
  INVALID_EMAIL: "Email inválido",
  USER_NOT_FOUND: "Usuário não encontrado",
  WRONG_PASSWORD: "Senha incorreta",
  GENERIC_ERROR: "Ocorreu um erro",
} as const;

export const SUCCESS_MESSAGES = {
  TASK_CREATED: "Lembrete criado com sucesso!",
  TASK_UPDATED: "Lembrete atualizado com sucesso!",
  TASK_DELETED: "Lembrete deletado com sucesso!",
} as const;

export const LABELS = {
  APP_NAME: "LunaFlow Lembretes",
  LOGIN_TITLE: "Bem-vindo ao LunaFlow",
  LOGIN_SUBTITLE: "Gerencie seus lembretes com facilidade",
  REMINDERS_TITLE: "Lembretes",
  TODAY_TASKS: "Tarefas de Hoje",
  NO_TASKS: "Nenhuma tarefa para hoje",
  NO_TASKS_SUBTITLE: "Adicione um novo lembrete para começar",
  CONFIRM_DELETE: "Tem certeza que deseja deletar este lembrete?",
  CONFIRM_LOGOUT: "Tem certeza que deseja sair?",
} as const;
