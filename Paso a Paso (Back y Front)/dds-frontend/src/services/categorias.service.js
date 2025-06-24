import axios from "axios";
import { config } from "../config.js";

const urlResource = config.urlResourceCategorias;


async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const categoriasService = {
  Buscar
};
