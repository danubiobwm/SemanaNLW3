import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import orphanagesViews from '../views/orphanages_views'
import Orphanage from '../models/Orphanage'
import * as Yup from 'yup'

export default {

  async show(request: Request, response: Response) {
    const { id } = request.params
    const orphanagesRepostitory = getRepository(Orphanage);
    const orphanage = await orphanagesRepostitory.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanagesViews.render(orphanage))
  },

  async index(request: Request, response: Response) {
    const orphanagesRepostitory = getRepository(Orphanage);
    const orphanages = await orphanagesRepostitory.find({
      relations: ['images']
    });

    return response.json(orphanagesViews.renderMany(orphanages))
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const orphanagesRepostitory = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(images => {
      return { path: images.filename }
    })


    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends:open_on_weekends==='true',
      images
    }
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      })),
    })


    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepostitory.create(data)
    await orphanagesRepostitory.save(orphanage)

    return response.status(201).json(orphanage);
  }
}