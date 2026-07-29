import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware';
import { prisma } from '../prisma';

export const foodRouter = Router();

//foods/
foodRouter.get('/', requireAuth, async (req, res) => {
  const search = String(req.query.search ?? '');
  const foods = await prisma.food.findMany({
    where: {
      userId: req.userId!,
      name: {
        contains: search,
      }
    },
    take: 10,
    orderBy: {
      name: 'asc',
    },
  });

  return res.json(foods);
});


foodRouter.post('/', requireAuth, async (req, res) => {
  const {
    name,
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g,
  } = req.body;

  const food = await prisma.food.create({
    data: {
      name,
      caloriesPer100g,
      carbsPer100g,
      proteinPer100g,
      fatPer100g,
      userId: req.userId!,
    },
  });

  return res.status(201).json(food);
});

// EDITAR alimento -> PUT /foods/:id
foodRouter.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const {
    name,
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g,
  } = req.body;

  const existing = await prisma.food.findFirst({
    where: {
      id,
      userId: req.userId!,
    },
  });

  if (!existing) {
    return res.status(404).json({ error: 'Alimento não encontrado' });
  }

  const food = await prisma.food.update({
    where: { id },
    data: {
      name,
      caloriesPer100g,
      carbsPer100g,
      proteinPer100g,
      fatPer100g,
    },
  });

  return res.json(food);
});

// EXCLUIR alimento -> DELETE /foods/:id
foodRouter.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const existing = await prisma.food.findFirst({
    where: {
      id,
      userId: req.userId!,
    },
  });

  if (!existing) {
    return res.status(404).json({ error: 'Alimento não encontrado' });
  }

  await prisma.food.delete({
    where: { id },
  });

  return res.status(204).send();
});