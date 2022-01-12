import axios from 'axios';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';
import type { DateTime } from 'luxon';

export interface IFetchPostRequest {
  StartDate?: DateTime;
  EndDate?: DateTime;
}

export const FetchPost = async (reqParam: IFetchPostRequest) => {
  try {
    const data = {}
    const config = { headers: { 'Content-Type': 'application/json' } };
    const resp = await axios.post('', data, config);

    // return resp.data ? FetchPostRequestParser.parse(resp.data) : {};
    return resp.data;
  } catch (err) {
    console.warn('err in FetchPost');
    console.warn(err);
    return null;
  }
}
