📚 UAZAPI GO - WHATSAPP API V2.0 - DOCUMENTAÇÃO COMPLETA
📋 INFORMAÇÕES GERAIS
Título: uazapiGO - WhatsApp API (v2.0)
Versão: 1.0.0
Base URL: https://{subdomain}.uazapi.com
Subdomínios disponíveis:

free - Servidor gratuito/demo
api - Servidor API principal

URL Completa Exemplo: https://free.uazapi.com/

⚠️ RECOMENDAÇÃO IMPORTANTE
É ALTAMENTE RECOMENDADO usar contas do WhatsApp Business em vez do WhatsApp normal para integração. O WhatsApp normal pode apresentar inconsistências, desconexões, limitações e instabilidades durante o uso com a API.

🔐 AUTENTICAÇÃO
Headers de Autenticação:
Endpoints Regulares:
token: seu_token_da_instancia
Content-Type: application/json
Endpoints Administrativos:
admintoken: seu_token_admin
Content-Type: application/json

📊 ESTADOS DA INSTÂNCIA
As instâncias podem estar nos seguintes estados:

disconnected - Desconectado do WhatsApp
connecting - Em processo de conexão
connected - Conectado e autenticado com sucesso


⚠️ LIMITES DE USO

O servidor possui um limite máximo de instâncias conectadas
Quando o limite é atingido, novas tentativas receberão erro 429
Servidores gratuitos/demo podem ter restrições adicionais de tempo de vida


🗂️ SCHEMAS PRINCIPAIS
Instance (Instância)
json{
  "id": "i91011ijkl",
  "token": "abc123xyz",
  "status": "connected",
  "paircode": "1234-5678",
  "qrcode": "data:image/png;base64,iVBORw0KGg...",
  "name": "Instância Principal",
  "profileName": "Loja ABC",
  "profilePicUrl": "https://example.com/profile.jpg",
  "isBusiness": true,
  "plataform": "Android",
  "systemName": "uazapi",
  "owner": "user@example.com",
  "current_presence": "available",
  "lastDisconnect": "2025-01-24T14:00:00Z",
  "lastDisconnectReason": "Network error",
  "adminField01": "custom_data",
  "adminField02": "more_data",
  "openai_apikey": "sk-...xyz",
  "chatbot_enabled": true,
  "chatbot_ignoreGroups": true,
  "chatbot_stopConversation": "parar",
  "chatbot_stopMinutes": 60,
  "chatbot_stopWhenYouSendMsg": 30,
  "created": "2025-01-24T14:00:00Z",
  "updated": "2025-01-24T14:30:00Z"
}
Campos:

id - ID único gerado automaticamente (UUID)
token - Token de autenticação da instância
status - Status atual da conexão
paircode - Código de pareamento
qrcode - QR Code em base64 para autenticação
name - Nome da instância
profileName - Nome do perfil WhatsApp
profilePicUrl - URL da foto do perfil
isBusiness - Indica se é uma conta business
plataform - Plataforma de origem (iOS/Android/Web)
systemName - Nome do sistema operacional
owner - Proprietário da instância
current_presence - Status de presença (available/unavailable)
lastDisconnect - Data/hora da última desconexão
lastDisconnectReason - Motivo da última desconexão
adminField01/02 - Campos administrativos customizados
openai_apikey - Chave da API OpenAI para chatbot
chatbot_enabled - Habilitar chatbot automático
chatbot_ignoreGroups - Ignorar mensagens de grupos
chatbot_stopConversation - Palavra-chave para parar conversa
chatbot_stopMinutes - Minutos pausado após comando stop
chatbot_stopWhenYouSendMsg - Minutos pausado ao enviar msg manual
fieldsMap - Mapa de campos customizados
created - Data de criação
updated - Data da última atualização


Webhook (Configuração de Webhooks)
json{
  "id": "wh_9a8b7c6d5e",
  "enabled": true,
  "url": "https://webhook.cool/example",
  "events": ["messages", "connection"],
  "addUrlTypesMessages": false,
  "addUrlEvents": false,
  "excludeMessages": []
}
Eventos Disponíveis:

connection - Eventos de conexão
history - Histórico de mensagens
messages - Mensagens recebidas
messages_update - Atualizações de mensagens
call - Chamadas
contacts - Contatos
presence - Presença
groups - Grupos
labels - Etiquetas
chats - Conversas
chat_labels - Etiquetas de conversas
blocks - Bloqueios
leads - Leads

Filtros de Exclusão (excludeMessages):

wasSentByApi - Enviada pela API
wasNotSentByApi - Não enviada pela API
fromMeYes - Enviada por mim
fromMeNo - Não enviada por mim
isGroupYes - É grupo
isGroupNo - Não é grupo


Chat (Conversa)
json{
  "id": "r7a8b9c0d1e",
  "wa_fastid": "5511999999999",
  "wa_chatid": "5511999999999@s.whatsapp.net",
  "wa_chatlid": "5511999999999@lid",
  "name": "João Silva",
  "unreadCount": 5,
  "conversationTimestamp": 1640995200,
  "archived": false,
  "pinned": false,
  "muteExpiration": 0
}
```

---

## 📡 ENDPOINTS COMPLETOS

### **🔧 ADMINISTRAÇÃO (Admin Endpoints)**

#### 1. Listar Todas Instâncias
```
GET /admin/instances
Header: admintoken: seu_token_admin
Resposta 200:
json{
  "instances": [
    {
      "id": "inst001",
      "token": "abc123",
      "status": "connected",
      "name": "Instância 1"
    }
  ]
}
```

---

#### 2. Criar Nova Instância
```
POST /admin/instance
Header: admintoken: seu_token_admin

Body:
{
  "name": "Nova Instância",
  "token": "custom_token_opcional"
}
Resposta 201:
json{
  "id": "inst_new_uuid",
  "token": "generated_or_custom_token",
  "name": "Nova Instância",
  "status": "disconnected",
  "created": "2025-01-24T14:00:00Z"
}
```

---

#### 3. Obter Detalhes de Instância (Admin)
```
GET /admin/instance/{id}
Header: admintoken: seu_token_admin
```

---

#### 4. Atualizar Instância (Admin)
```
PUT /admin/instance/{id}
Header: admintoken: seu_token_admin

Body:
{
  "name": "Nome Atualizado",
  "adminField01": "dados_customizados"
}
```

---

#### 5. Deletar Instância (Admin)
```
DELETE /admin/instance/{id}
Header: admintoken: seu_token_admin
Resposta 200:
json{
  "message": "Instance deleted successfully"
}
```

---

### **📱 INSTÂNCIA (Instance Management)**

#### 6. Obter Status da Instância
```
GET /instance/status
Header: token: seu_token
Resposta 200:
json{
  "status": "connected",
  "profileName": "Loja ABC",
  "profilePicUrl": "https://...",
  "isBusiness": true
}
```

---

#### 7. Conectar/Iniciar Sessão
```
POST /instance/connect
Header: token: seu_token
Resposta 200:
json{
  "status": "connecting",
  "qrcode": "data:image/png;base64,...",
  "paircode": "1234-5678"
}
```

---

#### 8. Desconectar Sessão
```
POST /instance/disconnect
Header: token: seu_token
```

---

#### 9. Fazer Logout (Limpar Sessão)
```
POST /instance/logout
Header: token: seu_token
```

---

#### 10. Obter QR Code
```
GET /instance/qr
Header: token: seu_token
Resposta 200:
json{
  "qrcode": "data:image/png;base64,iVBORw0KGg..."
}
```

---

#### 11. Obter Pair Code
```
GET /instance/paircode
Header: token: seu_token
Resposta 200:
json{
  "paircode": "ABCD-EFGH",
  "phone": "5511999999999"
}
```

---

#### 12. Reiniciar Instância
```
POST /instance/restart
Header: token: seu_token
```

---

### **👤 PERFIL (Profile)**

#### 13. Obter Informações do Perfil
```
GET /instance/profile
Header: token: seu_token
Resposta 200:
json{
  "name": "Loja ABC",
  "status": "Disponível 24h",
  "pictureUrl": "https://...",
  "phone": "5511999999999",
  "isBusiness": true
}
```

---

#### 14. Atualizar Nome do Perfil
```
PUT /instance/profile/name
Header: token: seu_token

Body:
{
  "name": "Novo Nome do Perfil"
}
```

---

#### 15. Atualizar Status/Recado
```
PUT /instance/profile/status
Header: token: seu_token

Body:
{
  "status": "Disponível 24h | Resposta em até 1h"
}
```

---

#### 16. Atualizar Foto de Perfil
```
PUT /instance/profile/picture
Header: token: seu_token

Body:
{
  "pictureUrl": "https://example.com/photo.jpg"
}

OU enviar Base64:

{
  "picture": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

---

#### 17. Remover Foto de Perfil
```
DELETE /instance/profile/picture
Header: token: seu_token
```

---

### **🏢 BUSINESS (WhatsApp Business)**

#### 18. Obter Perfil Business
```
GET /business/profile
Header: token: seu_token
Resposta 200:
json{
  "businessName": "Minha Empresa Ltda",
  "businessCategory": "RETAIL",
  "businessDescription": "Loja de produtos personalizados",
  "businessEmail": "contato@empresa.com",
  "businessWebsite": "https://empresa.com",
  "businessAddress": "Rua X, 123 - São Paulo/SP"
}
```

---

#### 19. Atualizar Perfil Business
```
PUT /business/profile
Header: token: seu_token

Body:
{
  "businessName": "Nome da Empresa",
  "businessCategory": "RETAIL",
  "businessDescription": "Descrição",
  "businessEmail": "email@empresa.com",
  "businessWebsite": "https://site.com",
  "businessAddress": "Endereço completo"
}
```

---

#### 20. Obter Horário de Funcionamento
```
GET /business/hours
Header: token: seu_token
```

---

#### 21. Configurar Horário de Funcionamento
```
PUT /business/hours
Header: token: seu_token

Body:
{
  "monday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "tuesday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "wednesday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "thursday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "friday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "saturday": {
    "isOpen": true,
    "openTime": "09:00",
    "closeTime": "14:00"
  },
  "sunday": {
    "isOpen": false
  }
}
```

---

### **📦 CATÁLOGO (Business Catalog)**

#### 22. Listar Produtos do Catálogo
```
GET /business/catalog
Header: token: seu_token
Resposta 200:
json{
  "products": [
    {
      "id": "prod_123",
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": "99.90",
      "currency": "BRL",
      "imageUrl": "https://...",
      "isHidden": false
    }
  ]
}
```

---

#### 23. Obter Catálogo de Outro Usuário
```
POST /business/catalog/get
Header: token: seu_token

Body:
{
  "jid": "5511888888888@s.whatsapp.net"
}
```

---

#### 24. Criar Produto no Catálogo
```
POST /business/catalog/create
Header: token: seu_token

Body:
{
  "name": "Nome do Produto",
  "description": "Descrição detalhada",
  "price": "149.90",
  "currency": "BRL",
  "imageUrl": "https://example.com/produto.jpg",
  "url": "https://loja.com/produto",
  "isHidden": false
}
```

---

#### 25. Atualizar Produto do Catálogo
```
PUT /business/catalog/update
Header: token: seu_token

Body:
{
  "id": "prod_123",
  "name": "Nome Atualizado",
  "price": "129.90"
}
```

---

#### 26. Obter Detalhes de Produto
```
POST /business/catalog/product
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "id": "prod_123"
}
```

---

#### 27. Deletar Produto
```
POST /business/catalog/delete
Header: token: seu_token

Body:
{
  "id": "prod_123"
}
```

---

#### 28. Mostrar Produto (Tornar Visível)
```
POST /business/catalog/show
Header: token: seu_token

Body:
{
  "id": "prod_123"
}
```

---

#### 29. Ocultar Produto
```
POST /business/catalog/hide
Header: token: seu_token

Body:
{
  "id": "prod_123"
}
```

---

### **🔗 WEBHOOKS**

#### 30. Obter Configuração de Webhook
```
GET /webhook
Header: token: seu_token
Resposta 200:
json{
  "id": "wh_123",
  "enabled": true,
  "url": "https://seu-servidor.com/webhook",
  "events": ["messages", "connection"],
  "addUrlTypesMessages": false,
  "addUrlEvents": false,
  "excludeMessages": []
}
```

---

#### 31. Configurar/Atualizar Webhook
```
POST /webhook
Header: token: seu_token

Body:
{
  "enabled": true,
  "url": "https://seu-servidor.com/webhook",
  "events": [
    "messages",
    "messages_update",
    "connection",
    "call"
  ],
  "addUrlTypesMessages": false,
  "addUrlEvents": false,
  "excludeMessages": ["isGroupYes", "fromMeYes"]
}
```

**Opções de `events`:**
- `connection` - Eventos de conexão/desconexão
- `history` - Sincronização de histórico
- `messages` - Mensagens recebidas
- `messages_update` - Atualizações de mensagens (editadas, deletadas)
- `call` - Chamadas recebidas
- `contacts` - Atualizações de contatos
- `presence` - Status de presença
- `groups` - Eventos de grupos
- `labels` - Etiquetas
- `chats` - Conversas
- `chat_labels` - Etiquetas de conversas
- `blocks` - Bloqueios
- `leads` - Leads

**Opções de `excludeMessages`:**
- `wasSentByApi` - Excluir mensagens enviadas pela API
- `wasNotSentByApi` - Excluir mensagens não enviadas pela API
- `fromMeYes` - Excluir minhas mensagens
- `fromMeNo` - Excluir mensagens de outros
- `isGroupYes` - Excluir mensagens de grupos
- `isGroupNo` - Excluir mensagens privadas

---

#### 32. Deletar Webhook
```
DELETE /webhook
Header: token: seu_token
```

---

### **📡 SSE (Server-Sent Events)**

#### 33. Conectar ao Stream SSE
```
GET /sse
Header: token: seu_token
```

**Uso:**
Estabelece uma conexão SSE para receber eventos em tempo real sem precisar de webhook.

**Exemplo de resposta (stream):**
```
event: messages
data: {"from":"5511999999999@s.whatsapp.net","body":"Olá!","timestamp":1640995200}

event: connection
data: {"status":"connected"}
```

---

### **💬 ENVIAR MENSAGENS**

#### 34. Enviar Texto Simples
```
POST /send/text
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "message": "Olá! Como posso ajudar?"
}
Resposta 200:
json{
  "messageId": "3EB0ABCD1234567890",
  "timestamp": 1640995200
}
```

---

#### 35. Enviar Texto com Formatação
```
POST /send/text
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "message": "*Texto em Negrito*\n_Texto em Itálico_\n~Texto Riscado~\n```Código Monospace```"
}
```

**Formatações:**
- `*texto*` - Negrito
- `_texto_` - Itálico
- `~texto~` - Riscado
- ` ```texto``` ` - Monoespaçado

---

#### 36. Enviar Imagem
```
POST /send/image
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "imageUrl": "https://example.com/imagem.jpg",
  "caption": "Confira esta imagem!"
}

OU com Base64:

{
  "jid": "5511999999999@s.whatsapp.net",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "caption": "Imagem em base64"
}
```

---

#### 37. Enviar Vídeo
```
POST /send/video
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "videoUrl": "https://example.com/video.mp4",
  "caption": "Veja este vídeo!"
}
```

---

#### 38. Enviar Áudio
```
POST /send/audio
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "audioUrl": "https://example.com/audio.mp3",
  "ptt": true
}
```

**Parâmetro `ptt`:**
- `true` - Áudio como mensagem de voz (Push-to-Talk)
- `false` - Áudio como arquivo de áudio normal

---

#### 39. Enviar Documento
```
POST /send/document
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "documentUrl": "https://example.com/documento.pdf",
  "fileName": "Contrato.pdf",
  "mimetype": "application/pdf"
}
```

---

#### 40. Enviar Sticker
```
POST /send/sticker
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "stickerUrl": "https://example.com/sticker.webp"
}

OU com Base64:

{
  "jid": "5511999999999@s.whatsapp.net",
  "sticker": "data:image/webp;base64,..."
}
```

---

#### 41. Enviar Localização
```
POST /send/location
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "latitude": -23.5505199,
  "longitude": -46.6333094,
  "name": "Avenida Paulista",
  "address": "Av. Paulista - Bela Vista, São Paulo - SP"
}
```

---

#### 42. Enviar Contato (VCard)
```
POST /send/contact
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "contact": {
    "name": "João Silva",
    "phone": "5511888888888"
  }
}
```

---

#### 43. Enviar Lista de Contatos
```
POST /send/contacts
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "contacts": [
    {
      "name": "João Silva",
      "phone": "5511888888888"
    },
    {
      "name": "Maria Santos",
      "phone": "5511777777777"
    }
  ]
}
```

---

#### 44. Enviar Botões (Quick Reply)
```
POST /send/buttons
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "text": "Como posso te ajudar?",
  "buttons": [
    {
      "id": "btn_suporte",
      "displayText": "💬 Suporte"
    },
    {
      "id": "btn_vendas",
      "displayText": "🛒 Vendas"
    },
    {
      "id": "btn_info",
      "displayText": "ℹ️ Informações"
    }
  ],
  "footer": "Escolha uma opção"
}
```

**Limite:** Até 3 botões

---

#### 45. Enviar Lista Interativa
```
POST /send/list
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "text": "Confira nossos serviços",
  "buttonText": "Ver Opções",
  "sections": [
    {
      "title": "Marketing Digital",
      "rows": [
        {
          "id": "trafego",
          "title": "Gestão de Tráfego",
          "description": "Google Ads e Meta Ads"
        },
        {
          "id": "social",
          "title": "Redes Sociais",
          "description": "Criação de conteúdo"
        }
      ]
    },
    {
      "title": "Desenvolvimento",
      "rows": [
        {
          "id": "site",
          "title": "Sites",
          "description": "Landing pages e e-commerce"
        }
      ]
    }
  ],
  "footer": "Selecione uma opção"
}
```

---

#### 46. Enviar Template (Business)
```
POST /send/template
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "templateName": "order_confirmation",
  "language": "pt_BR",
  "components": [
    {
      "type": "header",
      "parameters": [
        {
          "type": "text",
          "text": "Pedido #1234"
        }
      ]
    },
    {
      "type": "body",
      "parameters": [
        {
          "type": "text",
          "text": "João Silva"
        },
        {
          "type": "text",
          "text": "R$ 150,00"
        }
      ]
    }
  ]
}
```

---

#### 47. Reagir a Mensagem
```
POST /send/react
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "messageId": "3EB0ABCD1234567890",
  "emoji": "👍"
}
```

---

#### 48. Remover Reação
```
POST /send/react
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "messageId": "3EB0ABCD1234567890",
  "emoji": ""
}
```

**Nota:** Emoji vazio remove a reação

---

#### 49. Responder Mensagem (Reply)
```
POST /send/text
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "message": "Esta é uma resposta",
  "quotedMessageId": "3EB0ABCD1234567890"
}
```

---

#### 50. Mencionar Usuário
```
POST /send/text
Header: token: seu_token

Body:
{
  "jid": "5511999999999@g.us",
  "message": "Olá @5511888888888, tudo bem?",
  "mentions": ["5511888888888@s.whatsapp.net"]
}
```

---

#### 51. Enviar Link com Preview
```
POST /send/text
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "message": "Confira nosso site: https://exemplo.com",
  "linkPreview": true
}
```

---

### **✏️ AÇÕES EM MENSAGENS**

#### 52. Editar Mensagem
```
POST /message/edit
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "messageId": "3EB0ABCD1234567890",
  "newText": "Texto editado"
}
```

---

#### 53. Deletar Mensagem
```
POST /message/delete
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "messageId": "3EB0ABCD1234567890",
  "forEveryone": true
}
```

**Parâmetro `forEveryone`:**
- `true` - Apagar para todos
- `false` - Apagar apenas para você

---

#### 54. Encaminhar Mensagem
```
POST /message/forward
Header: token: seu_token

Body:
{
  "fromJid": "5511999999999@s.whatsapp.net",
  "toJid": "5511888888888@s.whatsapp.net",
  "messageId": "3EB0ABCD1234567890"
}
```

---

#### 55. Download de Mídia
```
GET /message/media/{messageId}
Header: token: seu_token
```

**Resposta:** Arquivo binário da mídia

---

#### 56. Obter URL de Mídia
```
POST /message/media/url
Header: token: seu_token

Body:
{
  "messageId": "3EB0ABCD1234567890"
}
Resposta 200:
json{
  "url": "https://mmg.whatsapp.net/...",
  "mimetype": "image/jpeg",
  "fileSize": 245678
}
```

---

### **💬 CONVERSAS (Chats)**

#### 57. Listar Conversas
```
GET /chats
Header: token: seu_token

Query Params:
  limit: 50
  offset: 0
Resposta 200:
json{
  "chats": [
    {
      "id": "5511999999999@s.whatsapp.net",
      "name": "João Silva",
      "unreadCount": 3,
      "lastMessageTime": 1640995200,
      "lastMessage": "Olá, tudo bem?",
      "archived": false,
      "pinned": false,
      "muteExpiration": 0
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

---

#### 58. Obter Histórico de Mensagens
```
GET /chat/messages
Header: token: seu_token

Query Params:
  jid: 5511999999999@s.whatsapp.net
  limit: 100
  before: 3EB0ABCD1234567890  (opcional - ID da mensagem)
Resposta 200:
json{
  "messages": [
    {
      "id": "3EB0ABCD1234567890",
      "fromMe": false,
      "type": "text",
      "body": "Olá!",
      "timestamp": 1640995200,
      "status": "read"
    }
  ]
}
```

---

#### 59. Marcar Chat como Lido
```
POST /chat/read
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 60. Marcar Chat como Não Lido
```
POST /chat/unread
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 61. Arquivar Chat
```
POST /chat/archive
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 62. Desarquivar Chat
```
POST /chat/unarchive
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 63. Fixar Chat
```
POST /chat/pin
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 64. Desfixar Chat
```
POST /chat/unpin
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 65. Silenciar Chat
```
POST /chat/mute
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "duration": 28800
}
```

**Duração em segundos:**
- 28800 = 8 horas
- 86400 = 24 horas
- 604800 = 7 dias
- 0 = Sempre

---

#### 66. Dessilenciar Chat
```
POST /chat/unmute
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 67. Deletar Chat
```
DELETE /chat
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 68. Limpar Mensagens do Chat
```
POST /chat/clear
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 69. Buscar Mensagens
```
POST /chat/search
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "query": "palavra-chave",
  "limit": 50
}
```

---

#### 70. Definir Presença (Digitando/Gravando)
```
POST /chat/presence
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "state": "composing"
}
```

**Estados disponíveis:**
- `composing` - Digitando...
- `recording` - Gravando áudio...
- `paused` - Parado

---

### **👥 CONTATOS (Contacts)**

#### 71. Listar Contatos
```
GET /contacts
Header: token: seu_token

Query Params:
  limit: 100
  offset: 0
Resposta 200:
json{
  "contacts": [
    {
      "jid": "5511999999999@s.whatsapp.net",
      "name": "João Silva",
      "notify": "João",
      "verifiedName": null,
      "imgUrl": "https://...",
      "status": "Hey there! I'm using WhatsApp"
    }
  ]
}
```

---

#### 72. Obter Contato
```
GET /contact/{jid}
Header: token: seu_token
```

**Exemplo:** `/contact/5511999999999@s.whatsapp.net`

---

#### 73. Obter Foto de Perfil
```
GET /contact/{jid}/picture
Header: token: seu_token
Resposta 200:
json{
  "url": "https://pps.whatsapp.net/...",
  "id": "picture_id_123"
}
```

---

#### 74. Obter Status/Recado
```
GET /contact/{jid}/status
Header: token: seu_token
Resposta 200:
json{
  "status": "Hey there! I'm using WhatsApp",
  "setAt": 1640995200
}
```

---

#### 75. Verificar se Número Existe
```
POST /contact/check
Header: token: seu_token

Body:
{
  "phones": [
    "5511999999999",
    "5511888888888",
    "5511777777777"
  ]
}
Resposta 200:
json{
  "results": [
    {
      "phone": "5511999999999",
      "exists": true,
      "jid": "5511999999999@s.whatsapp.net"
    },
    {
      "phone": "5511888888888",
      "exists": false,
      "jid": null
    }
  ]
}
```

---

#### 76. Bloquear Contato
```
POST /contact/block
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 77. Desbloquear Contato
```
POST /contact/unblock
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}
```

---

#### 78. Listar Bloqueados
```
GET /contacts/blocked
Header: token: seu_token
```

---

### **🏷️ ETIQUETAS (Labels)**

#### 79. Listar Etiquetas
```
GET /labels
Header: token: seu_token
Resposta 200:
json{
  "labels": [
    {
      "id": "label_123",
      "name": "Cliente VIP",
      "color": 0,
      "predefinedId": null
    }
  ]
}
```

---

#### 80. Criar Etiqueta
```
POST /label
Header: token: seu_token

Body:
{
  "name": "Cliente Premium",
  "color": 1
}
```

**Cores disponíveis (0-19):**
- 0: Azul
- 1: Verde
- 2: Amarelo
- 3: Vermelho
- etc...

---

#### 81. Atualizar Etiqueta
```
PUT /label/{labelId}
Header: token: seu_token

Body:
{
  "name": "Novo Nome",
  "color": 5
}
```

---

#### 82. Deletar Etiqueta
```
DELETE /label/{labelId}
Header: token: seu_token
```

---

#### 83. Adicionar Etiqueta ao Chat
```
POST /label/chat
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "labelId": "label_123"
}
```

---

#### 84. Remover Etiqueta do Chat
```
DELETE /label/chat
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "labelId": "label_123"
}
```

---

#### 85. Listar Chats com Etiqueta
```
GET /label/{labelId}/chats
Header: token: seu_token
```

---

### **👥 GRUPOS (Groups)**

#### 86. Listar Grupos
```
GET /groups
Header: token: seu_token
Resposta 200:
json{
  "groups": [
    {
      "id": "120363123456789012@g.us",
      "subject": "Grupo Família",
      "owner": "5511999999999@s.whatsapp.net",
      "creation": 1640995200,
      "participants": [
        {
          "jid": "5511999999999@s.whatsapp.net",
          "isAdmin": true,
          "isSuperAdmin": true
        }
      ],
      "size": 25,
      "announce": false,
      "restrict": false
    }
  ]
}
```

---

#### 87. Obter Informações do Grupo
```
GET /group/{groupId}
Header: token: seu_token
```

**Exemplo:** `/group/120363123456789012@g.us`

---

#### 88. Criar Grupo
```
POST /group
Header: token: seu_token

Body:
{
  "subject": "Novo Grupo",
  "participants": [
    "5511999999999@s.whatsapp.net",
    "5511888888888@s.whatsapp.net"
  ]
}
Resposta 201:
json{
  "groupId": "120363123456789012@g.us",
  "subject": "Novo Grupo"
}
```

---

#### 89. Atualizar Nome do Grupo
```
PUT /group/{groupId}/subject
Header: token: seu_token

Body:
{
  "subject": "Novo Nome do Grupo"
}
```

---

#### 90. Atualizar Descrição do Grupo
```
PUT /group/{groupId}/description
Header: token: seu_token

Body:
{
  "description": "Nova descrição do grupo"
}
```

---

#### 91. Atualizar Foto do Grupo
```
PUT /group/{groupId}/picture
Header: token: seu_token

Body:
{
  "pictureUrl": "https://example.com/foto.jpg"
}

OU Base64:

{
  "picture": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

---

#### 92. Remover Foto do Grupo
```
DELETE /group/{groupId}/picture
Header: token: seu_token
```

---

#### 93. Obter Link de Convite
```
GET /group/{groupId}/invite
Header: token: seu_token
Resposta 200:
json{
  "code": "AbCdEfGhIjKlMnOp",
  "inviteUrl": "https://chat.whatsapp.com/AbCdEfGhIjKlMnOp"
}
```

---

#### 94. Revogar Link de Convite
```
POST /group/{groupId}/invite/revoke
Header: token: seu_token
```

---

#### 95. Aceitar Convite de Grupo
```
POST /group/join
Header: token: seu_token

Body:
{
  "inviteCode": "AbCdEfGhIjKlMnOp"
}
```

---

#### 96. Adicionar Participantes
```
POST /group/{groupId}/participants
Header: token: seu_token

Body:
{
  "participants": [
    "5511999999999@s.whatsapp.net",
    "5511888888888@s.whatsapp.net"
  ]
}
```

---

#### 97. Remover Participantes
```
DELETE /group/{groupId}/participants
Header: token: seu_token

Body:
{
  "participants": [
    "5511999999999@s.whatsapp.net"
  ]
}
```

---

#### 98. Promover a Admin
```
POST /group/{groupId}/promote
Header: token: seu_token

Body:
{
  "participants": [
    "5511999999999@s.whatsapp.net"
  ]
}
```

---

#### 99. Rebaixar Admin
```
POST /group/{groupId}/demote
Header: token: seu_token

Body:
{
  "participants": [
    "5511999999999@s.whatsapp.net"
  ]
}
```

---

#### 100. Sair do Grupo
```
POST /group/{groupId}/leave
Header: token: seu_token
```

---

#### 101. Configurar Permissões do Grupo
```
PUT /group/{groupId}/settings
Header: token: seu_token

Body:
{
  "announce": true,
  "restrict": true,
  "approval": false
}
```

**Parâmetros:**
- `announce` - Apenas admins enviam mensagens
- `restrict` - Apenas admins editam info do grupo
- `approval` - Aprovar novos membros manualmente

---

### **📞 CHAMADAS (Calls)**

#### 102. Listar Chamadas Recentes
```
GET /calls
Header: token: seu_token
```

---

#### 103. Rejeitar Chamada
```
POST /call/reject
Header: token: seu_token

Body:
{
  "callId": "call_123"
}
```

---

### **🔄 PROXY**

#### 104. Obter Configuração de Proxy
```
GET /proxy
Header: token: seu_token
Resposta 200:
json{
  "enabled": true,
  "proxyUrl": "http://proxy.example.com:8080",
  "lastTest": "2025-01-24T14:00:00Z",
  "status": "connected"
}
```

---

#### 105. Configurar Proxy
```
POST /proxy
Header: token: seu_token

Body:
{
  "proxyUrl": "http://proxy.example.com:8080"
}
```

**Formato do proxyUrl:**
- HTTP: `http://host:port`
- HTTPS: `https://host:port`
- SOCKS5: `socks5://host:port`
- Com autenticação: `http://user:pass@host:port`

---

#### 106. Remover Proxy
```
DELETE /proxy
Header: token: seu_token
```

---

#### 107. Testar Proxy
```
POST /proxy/test
Header: token: seu_token

Body:
{
  "proxyUrl": "http://proxy.example.com:8080"
}
Resposta 200:
json{
  "success": true,
  "latency": 125,
  "message": "Proxy connection successful"
}
```

---

### **🤖 CHATBOT (AI Integration)**

#### 108. Obter Configuração do Chatbot
```
GET /chatbot
Header: token: seu_token
Resposta 200:
json{
  "enabled": true,
  "ignoreGroups": true,
  "openai_apikey": "sk-...xyz",
  "stopConversation": "parar",
  "stopMinutes": 60,
  "stopWhenYouSendMsg": 30
}
```

---

#### 109. Configurar Chatbot
```
POST /chatbot
Header: token: seu_token

Body:
{
  "enabled": true,
  "ignoreGroups": true,
  "openai_apikey": "sk-proj-...",
  "stopConversation": "parar",
  "stopMinutes": 60,
  "stopWhenYouSendMsg": 30
}
```

**Parâmetros:**
- `enabled` - Ativar/desativar chatbot
- `ignoreGroups` - Ignorar mensagens de grupos
- `openai_apikey` - Chave da API OpenAI
- `stopConversation` - Palavra para pausar bot
- `stopMinutes` - Minutos pausado após comando
- `stopWhenYouSendMsg` - Minutos pausado ao enviar manual

---

#### 110. Pausar Chatbot para um Contato
```
POST /chatbot/pause
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net",
  "minutes": 30
}
```

---

#### 111. Retomar Chatbot para um Contato
```
POST /chatbot/resume
Header: token: seu_token

Body:
{
  "jid": "5511999999999@s.whatsapp.net"
}

🎣 ESTRUTURA DE WEBHOOKS
Payload Base:
json{
  "event": "messages",
  "instance": "inst_uuid",
  "data": { /* dados do evento */ }
}

Evento: messages
json{
  "event": "messages",
  "instance": "inst_uuid",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "3EB0ABCD1234567890",
      "participant": null
    },
    "messageTimestamp": 1640995200,
    "pushName": "João Silva",
    "message": {
      "conversation": "Olá! Como posso ajudar?"
    },
    "messageType": "conversation",
    "isGroup": false,
    "wasSentByApi": false
  }
}
Tipos de mensagem (messageType):

conversation - Texto simples
extendedTextMessage - Texto com formatação/link/reply
imageMessage - Imagem
videoMessage - Vídeo
audioMessage - Áudio
documentMessage - Documento
stickerMessage - Sticker
locationMessage - Localização
contactMessage - Contato
buttonsResponseMessage - Resposta de botão
listResponseMessage - Resposta de lista


Evento: messages_update
json{
  "event": "messages_update",
  "instance": "inst_uuid",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "id": "3EB0ABCD1234567890"
    },
    "update": {
      "status": "read",
      "edited": true,
      "deleted": false
    }
  }
}

Evento: connection
json{
  "event": "connection",
  "instance": "inst_uuid",
  "data": {
    "state": "connected",
    "qr": null,
    "timestamp": 1640995200
  }
}
Estados:

connecting - Conectando
connected - Conectado
disconnected - Desconectado


Evento: call
json{
  "event": "call",
  "instance": "inst_uuid",
  "data": {
    "id": "call_123",
    "from": "5511999999999@s.whatsapp.net",
    "timestamp": 1640995200,
    "isVideo": false,
    "isGroup": false,
    "status": "ringing"
  }
}

Evento: groups
json{
  "event": "groups",
  "instance": "inst_uuid",
  "data": {
    "groupId": "120363123456789012@g.us",
    "action": "add",
    "participants": ["5511999999999@s.whatsapp.net"],
    "actor": "5511888888888@s.whatsapp.net"
  }
}
Ações:

add - Participante adicionado
remove - Participante removido
promote - Promovido a admin
demote - Rebaixado de admin
subject - Nome alterado
description - Descrição alterada
picture - Foto alterada
settings - Configurações alteradas


Evento: presence
json{
  "event": "presence",
  "instance": "inst_uuid",
  "data": {
    "jid": "5511999999999@s.whatsapp.net",
    "presence": "available",
    "lastSeen": 1640995200
  }
}
```

**Status:**
- `available` - Online
- `unavailable` - Offline
- `composing` - Digitando
- `recording` - Gravando áudio

---

## 📋 CÓDIGOS DE STATUS HTTP

### **Sucesso (2xx)**
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Sucesso sem conteúdo de resposta

### **Erro do Cliente (4xx)**
- `400 Bad Request` - Requisição inválida
- `401 Unauthorized` - Token inválido ou expirado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `429 Too Many Requests` - Limite de requisições atingido

### **Erro do Servidor (5xx)**
- `500 Internal Server Error` - Erro interno
- `503 Service Unavailable` - Serviço indisponível

---

## 🔄 FORMATO JID (Jabber ID)

### **Formatos:**

**Contato Pessoal:**
```
5511999999999@s.whatsapp.net
```

**Grupo:**
```
120363123456789012@g.us
```

**Status/História:**
```
status@broadcast
```

**Broadcast List:**
```
1234567890@broadcast

💡 EXEMPLOS PRÁTICOS
Exemplo 1: Fluxo Completo de Conexão
bash# 1. Conectar instância
curl -X POST https://free.uazapi.com/instance/connect \
  -H "token: seu_token"

# 2. Obter QR Code
curl -X GET https://free.uazapi.com/instance/qr \
  -H "token: seu_token"

# 3. Verificar status
curl -X GET https://free.uazapi.com/instance/status \
  -H "token: seu_token"

Exemplo 2: Enviar Mensagem com Botões
bashcurl -X POST https://free.uazapi.com/send/buttons \
  -H "token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "jid": "5511999999999@s.whatsapp.net",
    "text": "Como posso te ajudar?",
    "buttons": [
      {"id": "suporte", "displayText": "Suporte"},
      {"id": "vendas", "displayText": "Vendas"}
    ],
    "footer": "Escolha uma opção"
  }'

Exemplo 3: Configurar Webhook Completo
bashcurl -X POST https://free.uazapi.com/webhook \
  -H "token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "url": "https://seu-servidor.com/webhook",
    "events": [
      "messages",
      "messages_update",
      "connection",
      "call"
    ],
    "excludeMessages": [
      "isGroupYes",
      "fromMeYes"
    ]
  }'

Exemplo 4: Criar Grupo e Adicionar Membros
bash# Criar grupo
curl -X POST https://free.uazapi.com/group \
  -H "token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Equipe de Vendas",
    "participants": [
      "5511999999999@s.whatsapp.net",
      "5511888888888@s.whatsapp.net"
    ]
  }'

# Resposta: {"groupId": "120363...@g.us"}

# Adicionar mais membros
curl -X POST https://free.uazapi.com/group/120363...@g.us/participants \
  -H "token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "participants": [
      "5511777777777@s.whatsapp.net"
    ]
  }'

Exemplo 5: Verificar Números em Lote
bashcurl -X POST https://free.uazapi.com/contact/check \
  -H "token: seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "phones": [
      "5511999999999",
      "5511888888888",
      "5511777777777",
      "5511666666666"
    ]
  }'

🛠️ BOAS PRÁTICAS
1. Rate Limiting

Respeite os limites de requisições
Implemente retry com backoff exponencial
Use webhooks em vez de polling

2. Tratamento de Erros
javascripttry {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    console.error('API Error:', error);
  }
} catch (error) {
  console.error('Network Error:', error);
}
3. Webhooks

Sempre valide o payload recebido
Responda rapidamente (< 5 segundos)
Processe assincronamente se necessário
Implemente retry em caso de falha

4. Segurança

Nunca exponha seus tokens
Use HTTPS sempre
Valide entrada de usuários
Implemente rate limiting no seu lado

5. Mensagens

Use delay entre envios (5 segundos mínimo)
Evite spam e mensagens repetitivas
Personalize mensagens quando possível
Respeite opt-out dos usuários


📞 SUPORTE

Documentação: https://docs.uazapi.com
GitHub: https://github.com/uazapi
Site: https://uazapi.dev