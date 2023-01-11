import { FC, Props } from './typings';
import styles from './styles.module.scss';
import Title from 'components/Title';
import RoundedButton from 'components/RoundedButton';
import Input from 'components/Input';
import { useState } from 'react';

const AircraftDealerCard: FC<Props> = ({ aircraft, onClick, isFetching }) => {
  const [blocked, setBlocked] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [input, setInput] = useState('');

  const handleChange = (text: string) => {
    setBlocked(false);
    setValidationError('');
    const registrationWithoutSpecialCharacters = text.replaceAll('-', '');

    if (registrationWithoutSpecialCharacters.length !== 5) {
      setBlocked(true);
    }

    setInput(text.toUpperCase());
  };

  const handleBuyAircraft = async () => {
    setBlocked(true);
    setValidationError('');
    const isSuccess = await onClick(aircraft, input);
    setBlocked(false);
    if (!isSuccess) {
      setValidationError('Registration is not valid');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={aircraft.image} />
      </div>
      <div className={styles.description}>
        <Title className={styles.name} black>
          {`${aircraft.manufacture} ${aircraft.type}`}
        </Title>
      </div>

      <div className={styles.inputWrapper}>
        <Input
          onChange={(e) => handleChange(e.target.value)}
          maxLength={6}
          value={input}
          error={validationError}
          placeholder="eg. SP-RSA"
          label="Registration:"
        />
      </div>

      <div className={styles.context}>
        <div className={styles.price}>
          {new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'USD',
          }).format(aircraft.cost)}
        </div>
        <div className={styles.button}>
          <RoundedButton
            disabled={blocked || isFetching}
            onClick={handleBuyAircraft}
          >
            Buy
          </RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default AircraftDealerCard;
