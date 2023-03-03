import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";

export default async function messages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { authorization } = req.headers;

  const { name, email, phone, subject, message } = req.body;

  switch (method) {
    case "POST":
      const newMessage = await prisma.messages.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
        },
      });
      return res.status(201).json(newMessage);

    case "GET":
      if (authorization) {
        const messages = await prisma.messages.findMany();
        return res.status(200).json(messages);
      } else return res.status(501).json({ message: "Unauthorized" });

    default:
      break;
  }
}
