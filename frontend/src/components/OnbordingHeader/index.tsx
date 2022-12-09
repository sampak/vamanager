import { Step, StepLabel, Stepper } from '@mui/material';
import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import BodyText from 'components/BodyText';

const OnbordingHeader: FC<Props> = ({ title, subTitle, steps, activeStep }) => {
  return (
    <div className={styles.wrapper}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            className={activeStep >= index ? styles.step : ''}
            key={step.label}
          >
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Title className={styles.title} black>
        {title ?? ''}
      </Title>
      <BodyText className={styles.subTitle}>{subTitle ?? ''}</BodyText>
    </div>
  );
};

export default OnbordingHeader;
