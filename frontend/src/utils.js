
import axios from 'axios';

async function get(endpoint) {
    try {
      const res = await axios.get(`http://localhost:3000${endpoint}`);
      if (res.statusText !== 'OK') {
        throw new Error(`GET request to ${endpoint} failed`);
      }
      return res.data;
    } catch (e) {
      return {};
    }
  }

export default get;