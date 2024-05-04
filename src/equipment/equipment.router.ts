import express, { response } from 'express';
import { body, validationResult } from 'express-validator';

import * as EquipmentService from './equipment.service';

export const equipmentRouter = express.Router();

// GET: List of all Equipments
equipmentRouter.get('/', async (request, response) => {
  try {
    const equipments = await EquipmentService.listEquipments();

    const totalEquipments = equipments.length;
    response.setHeader(
      'Content-Range',
      `users 0-${totalEquipments - 1}/${totalEquipments}`
    );

    return response.status(200).json(equipments);
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

equipmentRouter.get('/available', async (request, response) => {
  try {
    const equipments =
      await EquipmentService.listEquipmentsWithoutPlaygrounds();
    return response.status(200).json(equipments);
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});

// GET: Get a single equipment by ID
equipmentRouter.get('/:id', async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    const equipment = await EquipmentService.getEquipment(id);
    if (equipment) {
      return response.status(200).json(equipment);
    }
    return response.status(404).json('Equipment could not be found');
  } catch (error: any) {
    return response.status(500).json({ errors: error.message, success: false });
  }
});
