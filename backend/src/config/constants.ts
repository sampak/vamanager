export const ERROR_CODES = {
  PIREP_IS_SUBMITTED: 'PIREP_IS_SUBMITTED',
  PIREP_NOT_FOUND: 'PIREP_NOT_FOUND',
  COMPANY_NOT_FOUND: 'COMPANY_NOT_FOUND',
};

export const ONE_HOUR = 3600;
export const MAXIMAL_AIRCRAFT_DAMAGE = 10;

export const COMPANY_POINTS = {
  LANDING_ON_DESTINATION: 4,
  LANDING_ON_ANOTHER_AIRPORT: -4,
  LANDING_ON_TIME: 4,
  DELAYED: -4,

  PERFECT_LANDING: 7,
  GOOD_LANDING: 4,
  BAD_LANDING: -7,
  HARD_DESCENT: -1,
  OVERSPEED: -5,
  STALL: -5,
};