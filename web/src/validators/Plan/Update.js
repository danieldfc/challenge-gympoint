import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string().strict(true),
  duration: Yup.string().strict(true),
  price: Yup.number().positive(),
});

export default schema;
