import * as Yup from 'yup';

const createScheduleSchema = Yup.object().shape({
  flightNumber: Yup.string()
    .min(3, 'Flight number is a required field')
    .required('Flight number is a required field'),
});

export default createScheduleSchema;
