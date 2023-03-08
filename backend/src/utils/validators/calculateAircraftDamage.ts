import { Pireps, Tracker, type_of_tracker } from '@prisma/client';
import { EventType } from '@shared/base/EventType';
import { MAXIMAL_AIRCRAFT_DAMAGE } from 'src/config/constants';
import { randomIntFromInterval } from '../randomIntFromInterval';

export const calculateAicraftDamage = (pirep: Pireps, tracker: Tracker[]) => {
  const landing_rate = tracker.find(
    (tracker) =>
      tracker.type === type_of_tracker.EVENT &&
      tracker.eventType === EventType.LANDING
  ).landing_rate;

  let percent = (landing_rate / 1000) * 100;
  if (percent > 100) {
    percent = 100;
  }
  if (percent < 0) {
    percent = 0;
  }

  let damage = (percent * MAXIMAL_AIRCRAFT_DAMAGE) / 100;

  const random = randomIntFromInterval(-4, 4);

  damage = damage + random;

  if (damage < 1) {
    damage = 1;
  }

  if (damage > MAXIMAL_AIRCRAFT_DAMAGE) {
    damage = MAXIMAL_AIRCRAFT_DAMAGE;
  }

  return damage;
};
