import * as Yup from 'yup';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .positive(),
  plan_id: Yup.number()
    .integer()
    .positive(),
  start_date: Yup.date(),
});

export default schema;
