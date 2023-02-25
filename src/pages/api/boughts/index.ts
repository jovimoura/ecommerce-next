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
    case "GET":
      const boughts = await prisma.boughts.findMany();
      return res.status(200).json(boughts);

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
