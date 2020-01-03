import * as Yup from 'yup';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .positive()
    .required(),
  plan_id: Yup.number()
    .integer()
    .positive()
    .required(),
  start_date: Yup.date().required(),
});

export default schema;
