import axios from "axios";

export default function fetchProductByName(productName) {
  return axios.get(`http://localhost:5000/products/${productName}`);
}
