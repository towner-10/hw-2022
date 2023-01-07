import { z } from "zod";
import { generateParagraph, generateSteps } from "../../cohere";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const guidesRouter = createTRPCRouter({
  createGuide: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Add "How to" to the title if it's not already there
      if (!input.title.toLowerCase().startsWith("how to")) {
        input.title = "How to " + input.title;
      }

      const res = await ctx.prisma.guide.create({
        data: {
          title: input.title,
        },
      });

      console.log("Generating steps for " + input.title);
      const cohereSteps = (await generateSteps(input.title)).body.generations[0]
        ?.text.split("\n");

      console.log(cohereSteps);

      (async () => {
        if (cohereSteps === undefined) return;

        let currentPartID = "";

        for (const step of cohereSteps) {
          const parsedStep = step.toLowerCase().replaceAll(" ", "");
          if (parsedStep.startsWith("part")) {
            const createdPart = await ctx.prisma.step.create({
              data: {
                text: step,
                guideId: res.id,
              },
            });

            currentPartID = createdPart.id;
          } else if (parsedStep.startsWith("step")) {
            await ctx.prisma.subStep.create({
              data: {
                text: step,
                stepId: currentPartID,
              },
            });
          }
        }
      })();

      return res;
    }),
  checkParagraphs: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const guide = await ctx.prisma.guide.findUnique({
        where: {
          id: input.id,
        },
        include: {
          steps: {
            include: {
              substeps: true,
            },
          },
        },
      });

      if (guide === null) return;
      
      const steps = guide.steps;

      for (const step of steps) {
        if (step.paragraph === null || step.paragraph === "") {
          const cohereParagraph = (await generateParagraph(guide.title, step.text, step.id)).body
            .generations[0]?.text.replaceAll("\n", " ").replaceAll("---", "");

          await ctx.prisma.step.update({
            where: {
              id: step.id,
            },
            data: {
              paragraph: cohereParagraph,
            },
          });
        }
      }
    }),
  generateParagraph: publicProcedure
    .input(z.object({ question: z.string(), part: z.string(), step: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const step = await ctx.prisma.step.findUnique({
        where: {
          id: input.step,
        },
      });

      if (step === null) return;
      if (step.paragraph !== null) return step.paragraph;

      const cohereParagraph = (await generateParagraph(input.question, input.part, input.step)).body
        .generations[0]?.text.replaceAll("\n", " ").replaceAll("---", "");

      await ctx.prisma.step.update({
        where: {
          id: step.id,
        },
        data: {
          paragraph: cohereParagraph,
        },
      });

      return cohereParagraph;
    }),
  viewGuide: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.guide.update({
        where: {
          id: input.id,
        },
        include: {
          steps: {
            include: {
              substeps: true,
            },
          },
        },
        data: {
          views: {
            increment: 1,
          }
        }
      });
    }),
  getAllGuides: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guide.findMany({
      include: {
        steps: true,
      },
    });
  }),
  getTopGuides: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.guide.findMany({
      orderBy: {
        views: "desc",
      },
      include: {
        steps: true,
      },
      take: 10,
    });
  }),
  getGuideSteps: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.step.findMany({
        where: {
          guideId: input.id,
        },
        include: {
          substeps: true,
        },
      });
    }),
});
