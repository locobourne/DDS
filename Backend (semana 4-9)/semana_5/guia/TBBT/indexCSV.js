import { createReadStream } from "fs";
import csv from "csv-parser";

function readCSV(file) {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(file)
      .on("error", (error) => reject(error))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

(async function main() {
  try {
    const data = await readCSV("./data/tbbt.csv");

    // 🧪 DESAFÍO 1: Títulos y ratings de temporada 1
    const temporada1 = data.filter(ep => ep.season === "1");
    temporada1.forEach(ep => {
      console.log(`T1E${ep.episode_num}: ${ep.title} (Rating: ${ep.imdb_rating})`);
    });

    // 🧪 DESAFÍO 2: Título del episodio 22 de la temporada 3
    const episodio22t3 = data.find(ep => ep.season === "3" && ep.episode_num === "22");
    console.log(`\nEpisodio 22 de la temporada 3: ${episodio22t3?.title}`);

    // 🧪 DESAFÍO 3: Promedio rating_imdb temporada 3
    const temporada3 = data.filter(ep => ep.season === "3");
    const promedio = temporada3.reduce((acc, ep) => acc + parseFloat(ep.imdb_rating), 0) / temporada3.length;
    console.log(`\nPromedio de rating temporada 3: ${promedio.toFixed(2)}`);

  } catch (error) {
    console.error("Error al leer archivo CSV:", error);
  }
})();
