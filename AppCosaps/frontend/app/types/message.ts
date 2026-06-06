//As mensagens tem que ser obtidas a partir do back-end e TODAS devem seguir esse padrão no front-end (ou similar)
export type message_frontview = {
  user_name: string;
  last_message: string;
  last_message_time: string;
  current_status: string;
  chat_id: string;
}

export type Message = {
  sender: string;
  receiver: string;
  content: string;
  status: boolean;
  timestamp: string;
  date: string;
}