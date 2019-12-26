import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  age: Yup.number()
    .positive()
    .integer(),
  weight: Yup.number().positive(),
  height: Yup.number().positive(),
});

export default schema;
