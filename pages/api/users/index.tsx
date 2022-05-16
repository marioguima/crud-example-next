import type { NextApiRequest, NextApiResponse } from 'next';
import User from 'src/models/User';
import dbConnection from 'src/services/database';

interface ErrorResponseType {
  sucess: boolean;
  error: unknown;
}

interface SucessResponseType {
  sucess: boolean;
  data: {}[];
}

export default async function user(req: NextApiRequest, res: NextApiResponse<ErrorResponseType | SucessResponseType>) {
  const { method } = req;

  switch (method) {

    case "GET":
      try {
        dbConnection();
        const users = await User.find({});
        res.status(200).json({ sucess: true, data: users });
      } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, error });
      }
      break;

    case "POST":
      try {
        const { name, email } = req.body;
        if (!name) throw 'Invalid name';
        if (!email) throw 'Invalid email';
        dbConnection();
        const user = await User.create({ name, email });
        res.status(201).json({ sucess: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, error });
      }
      break;

  }
}
