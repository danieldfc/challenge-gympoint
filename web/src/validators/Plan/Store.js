import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string()
    .strict(true)
    .required(),
  duration: Yup.number()
    .positive()
    .integer()
    .required(),
  price: Yup.number()
    .positive()
    .required(),
});

export default schema;
