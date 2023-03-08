import * as fsuipc from 'fsuipc';
import { Simulators } from '@shared/base/Simulators';
import { State } from './typings';
import { v4 as uuid } from 'uuid';

// const masa = 50000; // kg
// const predkosc_ladowania = 60; // m/s
// const czas_hamowania = 10; // s
// const odleglosc_hamowania = 2000; // m
// const kat_natarcia = 3; // stopnie

// const przyspieszenie_tarcia = 0.3;
// const przyspieszenie_hamowania = -5;

// const sila_tarcia = masa * przyspieszenie_tarcia;
// const sila_hamowania = masa * przyspieszenie_hamowania;
// const przyspieszenie_netto = (sila_tarcia + sila_hamowania) / masa;
// const przyspieszenie_g = przyspieszenie_netto / 9.81;

// console.log("Przyspieszenie g podczas lądowania samolotu wynosi " + przyspieszenie_g.toFixed(2)

export const convertToKMH = (ias: number) => {
  return ias * 1.852;
};

export const calculateGForce = (state: State) => {
  const weight = state.acars.weight.zfw + state.acars.fuel.total;

  const masa = weight; // kg

  const mass = 150000; // masa samolotu w kilogramach
  const v0 = convertToKMH(state.acars.positionHistory.at(-1)!.ias); // prędkość samolotu przed lądowaniem w km/h
  const v1 = convertToKMH(state.acars.ias); // prędkość samolotu po lądowaniu w km/h
  const t = 30; // czas trwania lądowania w sekundach
  const angle = 5; // kąt nachylenia podczas lądowania w stopniach

  // Obliczenie wartości przyspieszenia
  const a = (v1 * 1000) / 3600 - (v0 * 1000) / 3600 + 1;

  // Obliczenie wartości siły G
  const g = 9.81;
  const G = a / g;

  // Wyświetlenie wyniku
  console.log('Siła G podczas lądowania wynosi: ' + G.toFixed(2));
};

export const calculateLandingRate = (state: State) => {
  const verticalSpeeds = state.acars.positionHistory
    .slice(-2)
    .map((position) => position.verticalSpeed);

  verticalSpeeds.push(state.acars.verticalSpeed);
  console.log(verticalSpeeds);

  const sum = verticalSpeeds
    .slice(-2)
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  const average = sum / verticalSpeeds.length;

  return average;
};

export const pushToLogs = (
  state: State,
  text: string,
  sended: boolean,
  debug: boolean
) => {
  if (process.env.NODE_ENV !== 'development' && debug) {
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(text);
  }

  let msg = text;

  if (debug) {
    msg = `**DEBUG** ${text}`;
  }

  const logId = uuid();

  state.acars.logs.push({
    id: logId,
    sended: sended,
    text: msg,
    time: new Date(),
  });

  return logId;
};

export const convertUSGallonsToKgs = (value: number, temp: number) => {
  // a = 0.59 + (0.013 * 13);
  // a = 0.59 + (0.013 * temperatura)

  const static_density = 0.8;
  const alpha = 0.0008;
  const densinity = static_density * (1 - alpha * (temp - 15));

  return value * 3.7854 * densinity;
};

export const convertFuelToPercent = (value: number) => {
  return (value / 128 / 65536) * 100;
};

export const percentToValue = (percent: number, maximalValue: number) => {
  return (percent * maximalValue) / 100;
};

export const calculateTotalFuel = (value: any) => {
  const temp = value.temp / 256;
  const left_main_capacity = convertUSGallonsToKgs(
    value.fuel_left_main_capacity,
    temp
  );
  const center_main_capacity = convertUSGallonsToKgs(
    value.fuel_center_main_capacity,
    temp
  );
  const right_main_capacity = convertUSGallonsToKgs(
    value.fuel_right_main_capacity,
    temp
  );

  const left_main = percentToValue(
    convertFuelToPercent(value.fuel_left_main_percent),
    left_main_capacity
  );
  const center_main = percentToValue(
    convertFuelToPercent(value.fuel_center_main_percent),
    center_main_capacity
  );
  const right_main = percentToValue(
    convertFuelToPercent(value.fuel_right_main_percent),
    right_main_capacity
  );

  return left_main + center_main + right_main;
};

export const getSimulatorName = (path: string) => {
  const pathName = path.toLocaleLowerCase();
  if (pathName.search('x-plane') !== -1) {
    return Simulators.XPLANE;
  }

  if (pathName.search('prepar') !== -1) {
    return Simulators.PREPAR;
  }

  if (pathName.search('msfs') !== -1 || pathName.search('microsoft') !== -1) {
    return Simulators.MSFS;
  }

  return Simulators.UNKNOW;
};

export const bindVariables = (obj: any) => {
  obj.add('simPath', 0x3e00, fsuipc.Type.String, 256);
  obj.add('aircraftType', 0x3d00, fsuipc.Type.String, 256); // * String
  obj.add('latitude', 0x0560, fsuipc.Type.Int64);
  obj.add('longitude', 0x0568, fsuipc.Type.Int64);
  obj.add('heading', 0x0580, fsuipc.Type.Int64);
  obj.add('groundAltitude', 0x3324, fsuipc.Type.Int32); // *  Ground altitude in Metres x 256. // Init32
  obj.add('qnh', 0x0330, fsuipc.Type.Int64);
  obj.add('temp', 0x0e8c, fsuipc.Type.Int32);
  obj.add('clockHour', 0x23b, fsuipc.Type.Byte); // * Byte
  obj.add('clockMinutes', 0x23c, fsuipc.Type.Byte); // * Byte
  obj.add('clockSeconds', 0x023a, fsuipc.Type.Byte); // * Byte
  obj.add('lights', 0x028c, fsuipc.Type.BitArray, 2); // * Array
  obj.add('pause', 0x264, fsuipc.Type.Byte, 2); // * Pause indicator ( 0  = Not paused, 1 = Paused ) (From manual) // Byte
  obj.add('groundSpeed', 0x02b4, fsuipc.Type.Int32); // * Ground speed as 65536 * metres / sec  (From manual) // Byte
  obj.add('ias', 0x02bc, fsuipc.Type.Int32); // * Ground speed as 65536 * metres / sec  (From manual) // Byte
  obj.add('verticalSpeed', 0x02c8, fsuipc.Type.Int32); // * Vertical speed, signed, as 256 * metres/sec. // Byte
  obj.add('onGround', 0x366, fsuipc.Type.Byte, 2); // * Aircraft on ground flag (0=airborne, 1=on ground) // Byte
  obj.add('stallWarning', 0x36c, fsuipc.Type.Byte, 1); // * Stall warning (0=no, 1=stall) // Byte
  obj.add('overspeedWarning', 0x36d, fsuipc.Type.Byte, 1); // * Overspeed warning (0=no, 1=overspeed) // Byte
  obj.add('gear', 0x0be8, fsuipc.Type.Int32);
  obj.add('flaps', 0x0bdc, fsuipc.Type.Int32);
  obj.add('engine_two', 0x0930, fsuipc.Type.Int32, 2);
  obj.add('engine_one', 0x0898, fsuipc.Type.Int32, 2);
  obj.add('fuel_left_main_percent', 0x0b7c, fsuipc.Type.Int32, 4);
  obj.add('fuel_right_main_percent', 0x0b94, fsuipc.Type.Int32, 4);
  obj.add('fuel_center_main_percent', 0x0b74, fsuipc.Type.Int32, 4);
  obj.add('fuel_left_main_capacity', 0x0b80, fsuipc.Type.Int32, 4);
  obj.add('fuel_center_main_capacity', 0x0b78, fsuipc.Type.Int32, 4);
  obj.add('fuel_right_main_capacity', 0x0b98, fsuipc.Type.Int32, 4);
  obj.add('transponder', 0x0354, fsuipc.Type.Int32, 2);
  obj.add('zfw', 0x3bfc, fsuipc.Type.Byte, 4);
};
