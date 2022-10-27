import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  const { title, price, type, imageUrl } = req.body

  if (method === 'POST') {
    await prisma.items.create({
      data: {
        imageUrl,
        price,
        title,
        type
      }
    })

    return res.status(201).json({ message: "Item created!" })
  } else {
    return res.status(405).json({ message: 'Wrong method!' })
  }
}
