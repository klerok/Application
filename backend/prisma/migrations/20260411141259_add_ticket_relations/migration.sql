-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "customerId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketStatus" "ConversationStatus" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_chatId_key" ON "Ticket"("chatId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "ChatConversation"("chatId") ON DELETE CASCADE ON UPDATE CASCADE;
