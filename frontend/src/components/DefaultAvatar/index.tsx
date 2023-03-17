import { FC, Props } from './typing';
import styles from './styles.module.scss';
import { Avatar } from '@mui/material';
import { getLettersFromName } from 'utils/getLettersFromName';

const DefaultAvatar: FC<Props> = ({ name, className = '' }) => {
  const words = name.split(' ');

  const letters =
    words.length > 1
      ? `${words[0].charAt(0)}${words[1].charAt(0)}`
      : `${words[0].charAt(0)}`;

  return <Avatar className={className}>{letters.toUpperCase()}</Avatar>;
};

export default DefaultAvatar;
