# Trello and Server-Webhook

Este projeto permite integrar movimentações no Trello com um servidor utilizando WebHooks, proporcionando notificações personalizadas em tempo real.

## Pré-requisitos

1. **Criação de Power-Up no Trello**  
   Antes de tudo, crie um Power-Up no Trello: [Clique aqui para acessar](https://trello.com/power-ups/admin).

2. **Gerar API Key e Token**  
   Após criar o Power-Up, obtenha sua **API Key** e **Token** de acesso no Trello Developer.

---

## Configuração do WebHook

Com a API Key e Token gerados, faça uma requisição POST para o endpoint:  
**[https://api.trello.com/1/webhooks/](https://api.trello.com/1/webhooks/)**

### Corpo da Requisição:

```json
{
  "key": "YOUR-KEY",
  "token": "YOUR-TOKEN",
  "callbackURL": "URL for Ngrok or Others",
  "idModel": "ID Board",
  "description": "Description for webhook"
}
```

## Testes

Após configurar o WebHook, use o Ngrok ou outra ferramenta de testes para verificar a comunicação entre o Trello e seu servidor.

Testando com o Ngrok:

1. Inicie o Ngrok com o comando

```bash
ngrok http 3000
```

2. Use a URL gerada pelo Ngrok no campo callbackURL ao configurar o WebHook.
3. Simule ações no Trello para verificar se o servidor recebe as notificações corretamente.
