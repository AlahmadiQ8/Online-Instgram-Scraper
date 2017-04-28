import axios from 'axios';
import { parseItems } from './parser.js';

const url = 'https://8hzie8wbuk.execute-api.us-east-1.amazonaws.com/dev';

export const getInstaInfo = async(user, updateStates) => {
  let res, more = false, query = '', lastItem;
  let items = [];
  do {
    res = await axios.get(`${url}/get-data/${user}${query}`);
    items = items.concat(parseItems(res.data.items));
    if (!items.length && !more) {
      throw new Error(`User ${user} does not appear to be a public account`);
    }
    more = res.data.more_available;
    [lastItem] = items.slice(-1);
    query = `?max_id=${lastItem.id}`;
    const Stop = updateStates(items, more);
    if (Stop) {
      break;
    }
  } while (more);
}

