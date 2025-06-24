import { readFile } from "fs/promises";

// Lee el archivo JSON y devuelve un array de objetos
function readJSON(file) {
  return readFile(file, "utf8").then((data) => JSON.parse(data));
}

(async function main() {
  try {
    const data = await readJSON("./data/tbbt.json");

    // Construir: Map<temporada, Map<episodio_num, episodio>>
    const mapTbbt = new Map();

    data.forEach((ep) => {
      const temporada = mapTbbt.get(ep.season) || new Map();
      temporada.set(ep.episode_num, ep);
      mapTbbt.set(ep.season, temporada);
    });

    // 🧪 Punto 1: Listar títulos y ratings de temporada 1
    const temporada1 = mapTbbt.get("1");
    console.log("Episodios temporada 1:");
    temporada1.forEach((ep, nro) => {
      console.log(`T1E${nro}: ${ep.title} (Rating: ${ep.imdb_rating})`);
    });

    // 🧪 Punto 2: Mostrar título del episodio 22 de temporada 3
    const ep22t3 = mapTbbt.get("3")?.get("22");
    console.log(`\n Episodio 22 temporada 3: ${ep22t3?.title}`);

    // 🧪 Punto 3: Promedio de rating temporada 3
    const temporada3 = mapTbbt.get("3");
    let suma = 0;
    temporada3.forEach(ep => suma += parseFloat(ep.imdb_rating));
    const promedio = suma / temporada3.size;
    console.log(`\n Promedio rating temporada 3: ${promedio.toFixed(2)}`);

  } catch (error) {
    console.error("Error al consumir el archivo JSON:", error);
  }
})();
