import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";

export default async function message(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { boughtID } = Array.isArray(req.query) ? req.query[0] : req.query;
  const { idItem, idUser, status, qtd } = req.body;

  switch (method) {
    case "PATCH":
      const updateBought = await prisma.boughts.update({
        where: {
          id: boughtID,
        },
        data: {
          status,
          idItem,
          idUser,
          qtd,
        },
      });
      return res.status(201).json(updateBought);

    case "DELETE":
      const deletedBought = await prisma.boughts.delete({
        where: {
          id: boughtID,
        },
      });
      return res.status(204).json(deletedBought);

    default:
      return res.status(404).json({ message: "Wrong method!" });
  }
}
