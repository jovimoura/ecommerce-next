import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";

export default async function boughts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { idItem, idUser, status, qtd } = req.body;
  switch (method) {
    case "POST":
      const newBoughts = await prisma.boughts.create({
        data: {
          idItem,
          idUser,
          status,
          qtd,
        },
      });
      return res.status(201).json(newBoughts);

    default:
      break;
  }
}
