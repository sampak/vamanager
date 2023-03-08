import { Rating } from '@shared/base/Rating';

export const convertScoreToFlightRating = (score: number): Rating => {
  const percent = (score / 15) * 100;

  if (percent <= -80) {
    return Rating.HORRIBLE;
  }
  if (percent <= -60) {
    return Rating.THE_WORST;
  }
  if (percent <= -40) {
    return Rating.MUCH_WORSE;
  }
  if (percent <= -20) {
    return Rating.WORSE;
  }
  if (percent <= -1) {
    return Rating.BAD;
  }
  if (percent >= 0 && percent <= 20) {
    return Rating.GOOD;
  }

  if (percent >= 0 && percent <= 40) {
    return Rating.BETTER;
  }

  if (percent >= 0 && percent <= 60) {
    return Rating.MUCH_BETTER;
  }

  if (percent >= 0 && percent <= 80) {
    return Rating.BEST;
  }

  if ((percent >= 0 && percent <= 100) || percent > 100) {
    return Rating.PERFECT;
  }
};
