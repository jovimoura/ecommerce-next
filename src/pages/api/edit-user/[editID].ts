import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "../../../lib/prisma";

export default async function editUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { editID } = Array.isArray(req.query) ? req.query[0] : req.query;
  const { name, email, password, avatarUrl } = req.body;

  if (method === "PATCH") {
    const user = await prisma.users.update({
      where: {
        id: editID,
      },
      data: {
        name,
        email,
        password,
        avatarUrl,
      },
    });
    return res.status(200).json(user);
  } else {
    return res.status(404).json({ message: "Wrong method!" });
  }
}
