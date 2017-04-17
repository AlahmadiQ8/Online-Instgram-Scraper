import axios from 'axios';
import { parseItems } from './parser.js';

export const getInstaInfo = async(user, updateStates) => {
  let res, more = false, query = '', lastItem;
  let items = [];
  do {
    res = await axios.get(`/get-data/${user}${query}`);
    items = items.concat(parseItems(res.data.items));
    if (!items.length && !more) {
      throw new Error(`User ${user} does not appear to be a public account`);
    }
    more = res.data.more_available;
    [lastItem] = items.slice(-1);
    query = `?max_id=${lastItem.id}`;
    updateStates({items, more});
  } while (more);
}

