import { Users } from '@prisma/client';
import axios from 'axios';
import { config } from 'src/config';
import * as md5 from 'md5';

const fetch = async (staticID: string) => {
  try {
    const { data: simbriefData } = await axios.get(
      `https://www.simbrief.com/api/xml.fetcher.php?static_id=${staticID}&json=1`
    );

    return simbriefData;
  } catch (e) {
    throw new Error('FAILED_FETCH');
  }
};

interface AdditionalProps {
  reg?: string;
  callsign?: string;
  route?: string;
  costIndex?: string;
}

const create = async (
  currentUser: Users,
  airlineName,
  static_id,
  flightNumber,
  type,
  originICAO,
  destinationICAO,
  additionalData: AdditionalProps = {
    callsign: '',
    reg: '',
    route: '',
    costIndex: 'AUTO',
  }
) => {
  const url = new URL('https://www.simbrief.com/ofp/ofp.loader.api.php');
  const timestamp = new Date().getTime();
  const api_hash = md5(
    `${config.simbriefApiKey}${originICAO}${destinationICAO}${type}${timestamp}${config.simbriefOutputPage}`
  );

  url.searchParams.append('airline', airlineName);
  url.searchParams.append('static_id', static_id);
  if (additionalData.route) {
    url.searchParams.append('route', additionalData.route);
  }
  url.searchParams.append('callsign', additionalData.callsign);
  url.searchParams.append('fltnum', flightNumber);
  url.searchParams.append('type', type);
  url.searchParams.append('orig', originICAO);
  url.searchParams.append('dest', destinationICAO);
  url.searchParams.append('civalue', additionalData.costIndex);
  url.searchParams.append('reg', '');
  url.searchParams.append(
    'cpt',
    `${currentUser.firstName} ${currentUser.lastName}`
  );
  url.searchParams.append('apicode', api_hash);
  url.searchParams.append('timestamp', `${timestamp}`);
  url.searchParams.append('outputpage', config.simbriefOutputPage);

  return url;
};

export default {
  fetch,
  create,
};
