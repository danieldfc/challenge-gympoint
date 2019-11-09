import { object, date, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      student_id: number()
        .positive()
        .integer()
        .required(),
      plan_id: number()
        .positive()
        .integer()
        .required(),
      start_date: date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: { message: 'Validations failures.' } });
  }
};
