import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import { create, Whatsapp } from "venom-bot";
import { RequestBody } from "./interfaces/requestBody";

const app: FastifyInstance = fastify();

// Inicializar Venom Bot
let venomClient: Whatsapp | null = null;

create({
  session: "my-session", // Nome da sessão
  multidevice: true, // Suporte ao multi-dispositivo
})
  .then((client) => {
    venomClient = client;
    console.log("Venom Bot inicializado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao iniciar o Venom Bot:", error);
  });

// Função para enviar mensagem via Venom Bot
const sendWhatsAppMessage = async (
  to: string,
  message: string
): Promise<void> => {
  if (!venomClient) {
    throw new Error("Venom Client não inicializado.");
  }
  try {
    await venomClient.sendText(to, message);
    console.log("Mensagem enviada via WhatsApp:", message);
  } catch (error) {
    console.error("Erro ao enviar mensagem pelo WhatsApp:", error);
    throw new Error("Falha ao enviar mensagem pelo WhatsApp.");
  }
};

app.head("/", async (_, reply) => {
  reply.code(200).send();
});

// Rota para receber Webhooks
app.post("/", async (request: FastifyRequest<{ Body: RequestBody }>, reply) => {
  const { action } = request.body;

  if (
    action.display.translationKey === "action_move_card_from_list_to_list" &&
    action.data.listAfter.name === "Concluídas"
  ) {
    const recipient = "5513988080923@c.us"; // Substitua pelo número de destino
    const message = `Olá!
O card *${action.data.card.name}* foi movido para a lista Concluídas.
Isso ocorreu em ${new Date(action.date).toLocaleString()}.`;

    try {
      await sendWhatsAppMessage(recipient, message);
      reply.code(200).send({ success: true, message: "Notificação enviada." });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  } else {
    reply.code(200).send({ success: true, message: "Ação ignorada." });
  }
});

// Inicia o servidor Fastify
const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Servidor rodando na porta 3000");
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();
