import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";

export default async function feedbacks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { authorization } = req.headers;

  const { type, comment, screenshot } = req.body;

  switch (method) {
    case "POST":
      const newFeedbacks = await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot: screenshot ?? "",
        },
      });
      return res.status(201).json(newFeedbacks);

    case "GET":
      if (authorization) {
        const feedbacks = await prisma.feedback.findMany();
        return res.status(200).json(feedbacks);
      } else return res.status(501).json({ message: "Unauthorized" });

    default:
      break;
  }
}
