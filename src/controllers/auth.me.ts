import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { LEVEL_CHOICES } from '../constants/enums';

export async function me(
  req: Request,
  res: Response,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      githubLogin: true,
      name: true,
      avatarUrl: true,
    },
  });

  return res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  if (!req.userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  const { name, birthDate, avatarUrl, gender } = req.body;
  const data: Record<string, unknown> = {};

  if (name !== undefined) data.name = name;
  if (birthDate !== undefined) data.birthDate = new Date(birthDate);
  if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
  if (gender !== undefined) data.gender = gender;

  const user = await prisma.user.update({
    where: { id: req.userId },
    data,
    select: {
      id: true,
      githubLogin: true,
      name: true,
      avatarUrl: true,
      birthDate: true,
      gender: true,
    },
  });

  return res.json(user);
}