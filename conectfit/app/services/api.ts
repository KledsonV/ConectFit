// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.4:3000", // substitua pelo IP da sua máquina
});

export default api;
