import { Rating } from '@shared/base/Rating';

export const convertRating = (rating: Rating) => {
  switch (rating) {
    case Rating.HORRIBLE:
      return 0;
    case Rating.THE_WORST:
      return 0.5;
    case Rating.MUCH_WORSE:
      return 1;
    case Rating.WORSE:
      return 1.5;
    case Rating.BAD:
      return 2;
    case Rating.GOOD:
      return 2.5;
    case Rating.BETTER:
      return 3;
    case Rating.MUCH_BETTER:
      return 4;
    case Rating.BEST:
      return 4.5;
    case Rating.PERFECT:
      return 5;
    default:
      return 2.5;
  }
};
