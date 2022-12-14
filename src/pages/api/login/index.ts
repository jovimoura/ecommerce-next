import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import { prisma } from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  const users = await prisma.users.findMany()

  const verifyPassword = users.filter(item => item.email === email)

  const [user] = verifyPassword

  if (verifyPassword.length < 0) {
    return res.status(404).json({ error: "Email don't exists!" })
  }

  if (user?.password !== password) {
    return res.status(404).json({ error: 'Wrong password!' })
  }

  if (!user) {
    return res.status(404).json({ error: "User don't exists!" })
  }

  const response = {
    token: user?.id,
    user: {
      name: user?.name,
      email: user?.email,
      avatar_url: user?.avatarUrl,
      isAdmin: user?.isAdmin
    }
  }

  return res.status(200).json({ ...response, message: 'login successfully!' })
}
