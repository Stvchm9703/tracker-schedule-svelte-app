import axios from 'axios';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';
import luxon, { DateTime } from 'luxon';
// https://github.com/JohnWeisz/TypedJSON

@jsonObject
export class FetchPostRequest {
  @jsonMember({
    name: 'start-date',
    deserializer: value => DateTime.fromISO(value),
    serializer: timestamp => timestamp.format()
  })
  StartDate?: DateTime;

  
  EndDate?: DateTime;

}

export const FetchPost = async () => {
  return {};
}
