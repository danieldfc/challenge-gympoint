import { object, string, date } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      question: string()
        .strict(true)
        .required(),
      answer: string().strict(true),
      answer_at: date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: { message: 'Validations failures.' } });
  }
};
