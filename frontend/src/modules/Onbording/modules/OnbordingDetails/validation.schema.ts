import * as Yup from 'yup';

const OnbordingDetailsSchema = Yup.object().shape({
  name: Yup.string().required(''),
  icao: Yup.string().required('').length(3),
});

export default OnbordingDetailsSchema;
