# UZAPI Webhook - Estrutura Real do Payload

> [!NOTE]
> Este documento descreve a estrutura **real** do payload enviado pela UZAPI, que difere da documentação oficial.

## Evento: `messages`

Quando uma mensagem é recebida no WhatsApp, a UZAPI envia este payload:

```json
{
  "BaseUrl": "https://fidelify.uazapi.com",
  "EventType": "messages",
  "instanceName": "crm-fidelify",
  "owner": "559181617148",
  "token": "1ee0c9ea-2436-422f-aadf-910f86b19504",
  
  "chat": {
    "id": "r3d87ae4d976d56",
    "name": "Bóris",
    "phone": "+55 11 97063-6118",
    "wa_chatid": "5511970636118@s.whatsapp.net",
    "wa_name": "Bóris",
    "imagePreview": "https://pps.whatsapp.net/v/t61...",
    "wa_unreadCount": 2,
    "wa_lastMsgTimestamp": 1768791718000,
    "wa_lastMessageTextVote": "Oiiiii",
    "wa_lastMessageType": "Conversation",
    "wa_isGroup": false,
    "wa_archived": false,
    "wa_isPinned": false,
    "wa_isBlocked": false,
    "lead_name": "",
    "lead_email": "",
    "lead_notes": "",
    "lead_tags": [],
    "lead_status": "",
    "lead_isTicketOpen": false,
    "chatbot_disableUntil": 0
  },
  
  "message": {
    "id": "559181617148:3A7C7D31DC6D50131D0F",
    "messageid": "3A7C7D31DC6D50131D0F",
    "chatid": "5511970636118@s.whatsapp.net",
    "sender": "5511970636118@s.whatsapp.net",
    "senderName": "Bóris",
    "content": "Oiiiii",
    "text": "Oiiiii",
    "type": "text",
    "messageType": "Conversation",
    "messageTimestamp": 1768791718000,
    "fromMe": false,
    "isGroup": false,
    "mediaType": "",
    "source": "ios",
    "wasSentByApi": false
  },
  
  "chatSource": "updated"
}
```

## Campos Principais

| Campo | Descrição |
|-------|-----------|
| `EventType` | Tipo do evento (`messages`, `messages_update`, `connection`) |
| `message.chatid` | JID do WhatsApp (identificador único) |
| `message.content` / `message.text` | Conteúdo da mensagem |
| `message.senderName` | Nome do remetente |
| `message.fromMe` | `true` se enviada por você |
| `chat.wa_name` | Nome do contato no WhatsApp |
| `chat.phone` | Telefone formatado |
| `chat.imagePreview` | URL do avatar |

## Diferenças da Documentação Oficial

| Documentação | Realidade |
|--------------|-----------|
| `event` | `EventType` |
| `data.key.remoteJid` | `message.chatid` |
| `data.message.conversation` | `message.content` |
| `data.pushName` | `message.senderName` |
