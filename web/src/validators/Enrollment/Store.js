import * as Yup from 'yup';

const schema = Yup.object().shape({
  student_id: Yup.number().required(),
  plan_id: Yup.number().required(),
  start_date: Yup.date().required(),
});

export default schema;
