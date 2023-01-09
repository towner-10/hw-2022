import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import { generateParagraph } from "../../../server/cohere";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "[X] Method not allowed.", success: false });
  }

  const { guideID, partID, stepID } = req.query;

  if (guideID === undefined || partID === undefined || stepID === undefined) {
    return res.status(405).json({ error: "Missing parameters" });
  }

  console.log(
    `[X] Checking paragraph for Guide: ${guideID}, Part: ${partID}, Step: ${stepID}`
  );

  const guide = await prisma.guide.findUnique({
    where: {
      id: guideID as string,
    },
  });

  if (guide === null) {
    return res.status(404).json({ error: "Guide not found" });
  }

  const result = await checkParagraphStep(guideID as string, stepID as string);

  if (result) return res.status(200).json({ message: "John Doe" });
  return res.status(201).json({ message: "John Doe" });
}

const checkParagraphStep = async (guide: string, step: string) => {
  const substep = await prisma.subStep.findUnique({
    where: {
      id: step,
    },
  });

  if (substep === null) return false;

  if (substep.paragraph === null || substep.paragraph === "") {
    const cohereParagraph = (
      await generateParagraph(guide, step, substep.text)
    ).body.generations[0]?.text
      .replaceAll("\n", " ")
      .replaceAll("---", "");

    await prisma.subStep.update({
      where: {
        id: step,
      },
      data: {
        paragraph: cohereParagraph,
      },
    });

    return true;
  }

  return false;
};
