import type { NextApiRequest, NextApiResponse } from 'next';
import User from 'src/models/User';
import dbConnection from 'src/services/database';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { UserID } = req.query;

  switch (method) {

    case "PUT":
      try {
        const { name, email } = req.body;
        if (!name) throw 'Invalid name';
        if (!email) throw 'Invalid email';
        dbConnection();
        await User.updateOne({ _id: UserID }, { name, email });
        res.status(200).json({ sucess: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, error });
      }
      break;

    case "DELETE":
      try {
        dbConnection();
        await User.deleteOne({ _id: UserID });
        res.status(200).json({ sucess: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ sucess: false, error });
      }
      break;

  }
}
