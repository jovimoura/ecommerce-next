import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
export default async function loginID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { loginId } = Array.isArray(req.query) ? req.query[0] : req.query;

  const user = await prisma.users.findUnique({
    where: {
      id: loginId,
    },
  });

  const response = {
    name: user?.name,
    avatarUrl: user?.avatarUrl,
    isAdmin: user?.isAdmin,
    email: user?.email,
  };

  return res.status(200).json(response);
}
