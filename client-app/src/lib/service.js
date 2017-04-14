import axios from 'axios'; 
import { parseItems } from './parser.js';

export const getInstaInfo = async(user, pages, updateStates) => {
  let res, more = false, query = '', minId;
  const items = [];
  do {
    res = await axios.get(`/get-data/${this.state.inputText}${query}`);
    items.concat(parseItems(res.date.items));
    more = res.data.more_available;
    [minId] = items.slice(-1).id;
    query = `?max_id=${minId}`;
    updateStates({items, more});
  } while (more);
}

