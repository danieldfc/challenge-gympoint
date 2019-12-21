import { object, string, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      title: string()
        .strict(true)
        .required(),
      duration: string()
        .strict(true)
        .required(),
      price: number()
        .positive()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: { message: 'Validations failures.' } });
  }
};
