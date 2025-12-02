export enum UserPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  BUSINESS = 'BUSINESS'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  plan: UserPlan;
  credits: number;
  savedItemIds: string[];
  recentlyViewedIds: string[];
  joinedDate: string;
}

export enum LibraryCategory {
  AI_TOOL = 'AI Tool',
  STARTUP_IDEA = 'Startup Idea',
  AUTOMATION = 'Automation Template',
  WORKFLOW = 'Workflow Idea'
}

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  category: LibraryCategory;
  tags: string[];
  imageUrl: string;
  isPremium: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ToolResult {
  tool: string;
  content: string;
  date: string;
}

export interface PaymentConfig {
    plan: UserPlan;
    amount: number;
    currency: string;
}