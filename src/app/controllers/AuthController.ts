import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'user does not exists' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) res.status(401).json({ error: 'password does not match' });

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return res.json({
      user: _.omit(user, 'password'),
      token,
    });
  }
}

export default new AuthController();
