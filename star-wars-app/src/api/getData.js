import axios from "axios";
export const getData = async url => {
  try {
    console.log('me');
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
