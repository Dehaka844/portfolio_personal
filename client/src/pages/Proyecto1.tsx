import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";

/**
 * Proyecto 1 - SQL Schema Generator with ER Diagram
 *
 * This component provides an AI-powered interface to:
 * 1. Accept project ideas from users
 * 2. Generate optimized SQL table schemas using AI
 * 3. Display an Entity-Relationship (ER) diagram
 * 4. Show generated SQL code
 *
 * Layout:
 * - Left side: Chat interface with message history and input
 * - Right side: ER diagram and generated SQL code
 * - Initial popup: Explains the tool's functionality
 *
 * The component uses tRPC for backend communication with the AI service.
 */
export default function Proyecto1() {
  const [, navigate] = useLocation();
  const [showInfoDialog, setShowInfoDialog] = useState(true);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sqlSchema, setSqlSchema] = useState("");
  const [erDiagram, setErDiagram] = useState("");

  // tRPC mutation for generating SQL schema with AI
  const generateSchemaMutation = trpc.sqlGenerator.generateSchema.useMutation();

  /**
   * Handle sending a message to the AI
   * This function:
   * 1. Adds the user message to the chat
   * 2. Sends the message to the backend AI service
   * 3. Receives and displays the generated SQL schema
   * 4. Generates an ER diagram from the schema
   */
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: "user" as const, content: userInput },
    ];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    try {
      // Call the tRPC mutation to generate SQL schema
      const result = await generateSchemaMutation.mutateAsync({
        projectIdea: userInput,
      });

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `He generado el esquema SQL para tu proyecto. Aquí están las tablas optimizadas:\n\n\`\`\`sql\n${result.sqlSchema}\n\`\`\``,
        },
      ]);

      // Update SQL schema display
      const schemaContent = typeof result.sqlSchema === 'string' ? result.sqlSchema : '';
      setSqlSchema(schemaContent);

      // Generate ER diagram from the schema
      if (result.erDiagram) {
        const diagramContent = typeof result.erDiagram === 'string' ? result.erDiagram : '';
        setErDiagram(diagramContent);
      }
    } catch (error) {
      // Handle error and add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error al generar el esquema. Por favor, intenta de nuevo.",
        },
      ]);
      console.error("Error generating schema:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle keyboard shortcut for sending messages (Enter key)
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col">
      {/* Header with navigation */}
      <header className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Volver a inicio"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-accent">
              Generador de Esquemas SQL
            </h1>
            <p className="text-sm text-muted-foreground">
              Powered by AI - Genera tablas optimizadas
            </p>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Chat Interface */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-border">
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Info className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Introduce una idea de proyecto para comenzar
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-none"
                      : "bg-card border border-border text-foreground rounded-bl-none"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Streamdown>{message.content}</Streamdown>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-4 py-2 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-accent rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Describe tu idea de proyecto..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-input border-border"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - ER Diagram and SQL Code */}
        <div className="hidden md:flex w-1/2 flex-col border-l border-border overflow-hidden">
          {/* ER Diagram area */}
          <div className="flex-1 border-b border-border overflow-auto p-4">
            <h2 className="text-lg font-bold text-accent mb-4">
              Diagrama Entidad-Relación
            </h2>
            {erDiagram ? (
              <div className="bg-card border border-border rounded-lg p-4 overflow-auto">
                <img
                  src={erDiagram}
                  alt="ER Diagram"
                  className="max-w-full h-auto"
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>El diagrama ER aparecerá aquí después de generar el esquema</p>
              </div>
            )}
          </div>

          {/* SQL Code area */}
          <div className="flex-1 overflow-auto p-4">
            <h2 className="text-lg font-bold text-accent mb-4">
              Código SQL Generado
            </h2>
            {sqlSchema ? (
              <div className="bg-card border border-border rounded-lg p-4 overflow-auto">
                <pre className="text-xs text-foreground whitespace-pre-wrap break-words">
                  <code>{sqlSchema}</code>
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>El código SQL aparecerá aquí después de generar el esquema</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information Dialog - Shown on first visit */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-accent">
              Bienvenido al Generador de Esquemas SQL
            </DialogTitle>
            <DialogDescription className="text-foreground">
              Esta herramienta te ayuda a crear esquemas de base de datos
              optimizados usando Inteligencia Artificial.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm text-foreground">
            <div>
              <h3 className="font-semibold text-accent mb-2">¿Cómo funciona?</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Describe la idea de tu proyecto en el chat (ej: "Sistema de
                  gestión de tienda online")
                </li>
                <li>
                  La IA analizará tu idea y generará las tablas SQL más
                  optimizadas
                </li>
                <li>
                  Visualiza el diagrama entidad-relación (ER) de las tablas
                </li>
                <li>
                  Copia el código SQL generado para usar en tu base de datos
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-accent mb-2">Características</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Generación automática de tablas optimizadas</li>
                <li>Diagrama entidad-relación visual</li>
                <li>Código SQL listo para usar</li>
                <li>Relaciones y restricciones automáticas</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={() => setShowInfoDialog(false)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
          >
            Entendido, vamos a empezar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
