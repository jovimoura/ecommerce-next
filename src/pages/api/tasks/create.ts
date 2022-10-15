import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
  const { title } = req.body

  await prisma.task.create({
    data: {
      title,
      isDone: false
    }
  })

  return res.status(201).json({})
}