import RoundedButton from 'components/RoundedButton';
import AuthContext from 'contexts/auth';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateInsideWorkspace } from 'utils/navigateInsideWorkspace';
import styles from './styles.module.scss';

const EmptyState = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>✈️</div>
      <div className={styles.text}>Your company doesn't have any aircraft</div>
      {user?.uiConfiguration?.canManageAircrafts && (
        <div className={styles.buttonWrapper}>
          <RoundedButton
            onClick={() =>
              navigateInsideWorkspace(
                navigate,
                workspaceId,
                '/aircrafts/dealer'
              )
            }
          >
            Buy Aircraft
          </RoundedButton>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
