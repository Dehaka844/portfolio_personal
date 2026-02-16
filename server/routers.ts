import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // SQL Generator router - Generates optimized SQL schemas using AI
  sqlGenerator: router({
    generateSchema: publicProcedure
      .input(z.object({ projectIdea: z.string() }))
      .mutation(async ({ input }) => {
        /**
         * Generate SQL schema using AI
         * This procedure:
         * 1. Takes a project idea from the user
         * 2. Uses LLM to generate optimized SQL tables
         * 3. Creates an ER diagram representation
         * 4. Returns both the SQL code and diagram
         */
        try {
          // Call LLM to generate SQL schema
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are an expert database architect. Generate optimized SQL CREATE TABLE statements based on the project idea. 
                Return ONLY valid SQL code without explanations or markdown formatting. 
                Include proper data types, primary keys, foreign keys, and indexes.
                Make sure to create realistic and well-structured tables.`,
              },
              {
                role: "user",
                content: `Generate SQL tables for this project: ${input.projectIdea}`,
              },
            ],
          });

          const sqlSchema =
            response.choices[0]?.message.content || "Error generating schema";

          // Generate ER diagram description
          const erResponse = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are an expert at creating Mermaid ER diagrams. Generate a Mermaid ER diagram based on the following SQL schema.
                Return ONLY the Mermaid diagram code without any explanations or markdown formatting.`,
              },
              {
                role: "user",
                content: `Create a Mermaid ER diagram for these tables:\n${sqlSchema}`,
              },
            ],
          });

          const erDiagram = erResponse.choices[0]?.message.content || "";

          return {
            sqlSchema,
            erDiagram,
          };
        } catch (error) {
          console.error("Error generating schema:", error);
          throw new Error("Failed to generate SQL schema");
        }
      }),
  }),

  // Product Search router - Searches for products across online retailers
  productSearch: router({
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .mutation(async ({ input }) => {
        /**
         * Search for products across online retailers
         * This procedure:
         * 1. Takes a search query from the user
         * 2. Uses web search or API to find products
         * 3. Aggregates results from multiple retailers
         * 4. Returns formatted product data with images, prices, and links
         */
        try {
          // Call LLM to generate mock product results
          // In production, this would call actual product search APIs
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: `You are a product search assistant. Generate realistic product results for the search query.
                Return a JSON array with products. Each product should have: id, name, price, image (URL), description, url, retailer.
                Use realistic product data and prices. Return ONLY valid JSON without explanations.`,
              },
              {
                role: "user",
                content: `Search for: ${input.query}. Return 6 realistic products from different retailers as JSON array.`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "products",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          name: { type: "string" },
                          price: { type: "string" },
                          image: { type: "string" },
                          description: { type: "string" },
                          url: { type: "string" },
                          retailer: { type: "string" },
                        },
                        required: [
                          "id",
                          "name",
                          "price",
                          "image",
                          "description",
                          "url",
                          "retailer",
                        ],
                      },
                    },
                  },
                  required: ["products"],
                },
              },
            },
          });

          const content = response.choices[0]?.message.content || "{}";
          const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
          const parsed = JSON.parse(contentStr);
          return parsed.products || [];
        } catch (error) {
          console.error("Error searching products:", error);
          throw new Error("Failed to search products");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
