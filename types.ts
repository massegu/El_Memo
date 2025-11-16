export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

// Reward System Types
export interface Reward {
  id: string;
  name: string;
  cost: number;
}

export interface Avatar extends Reward {
  type: 'avatar';
}

export interface Background extends Reward {
  type: 'background';
  className: string;
}
