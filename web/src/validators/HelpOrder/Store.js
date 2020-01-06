import * as Yup from 'yup';

const schema = Yup.object().shape({
  answer: Yup.string()
    .strict(true)
    .required(),
});

export default schema;
