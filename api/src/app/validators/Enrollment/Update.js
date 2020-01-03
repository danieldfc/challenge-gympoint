import { object, number, date } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      student_id: number()
        .positive()
        .integer(),
      plan_id: number()
        .positive()
        .integer(),
      start_date: date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: { message: 'Validations failures.' } });
  }
};
