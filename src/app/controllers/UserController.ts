import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  async fetch(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: req.userId } });

    return res.json(user);
  }

  async store(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) return res.status(409).json({ error: 'email already registered' });

    const user = userRepository.create({ email, password });
    await userRepository.save(user);

    return res.json(user);
  }
}

export default new UserController();
