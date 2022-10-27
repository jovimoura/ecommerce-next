import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { itemID } = Array.isArray(req.query) ? req.query[0] : req.query
  const { title, price, imageUrl, type } = req.body

  switch (method) {
    case 'GET':
      const item = await prisma.items.findUnique({
        where: {
          id: itemID
        }
      })
      return res.status(200).json(item)
    case 'PATCH':
      const updateItem = await prisma.items.update({
        where: {
          id: itemID
        },
        data: {
          title,
          price,
          imageUrl,
          type
        }
      })
      return res.status(200).json(updateItem)
    case 'DELETE':
      const deleteItem = await prisma.items.delete({
        where: {
          id: itemID
        }
      })
      return res.status(204).json(deleteItem)
    default:
      return res.status(400).json({ message: 'Wrong method!' })
      break
  }
}
