export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  role: 'agent' | 'lead' | 'bot';
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string; // HTML or Text
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  createdAt: string; // ISO Date
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

export interface Chat {
  id: string;
  leadId: string;
  leadName: string;
  leadAvatar?: string;
  leadPhone?: string;
  lastMessage?: string;
  lastMessageAt: string;
  unreadCount: number;
  status: 'open' | 'closed' | 'snoozed';
  tags: string[]; // e.g. ["A441", "Quente"]
  funnelStage: string; // "Leads de entrada"
  assignedTo?: string; // Agent ID
}
