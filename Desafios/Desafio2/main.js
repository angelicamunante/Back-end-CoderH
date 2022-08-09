const Contenedor = require("./Desafio2");

const main = async () => {
  const contenedor = new Contenedor("./Desafios/Desafio/productos.txt");
  console.log(contenedor.ruta);
  console.log(await contenedor.getAll());
  console.log(await contenedor.getById(2));
  console.log(await contenedor.save({ title: "JavaScript03", price: 230, thumbnail: "https://www.coderhouse.com.pe/javascript" }));
  console.log(await contenedor.save({title:"JavaScript05", price: 300,thumbnail: "https://www.coderhouse.com.pe/javascript"}));
  console.log(await contenedor.deleteById(1));
  console.log(await contenedor.deleteAll());
}
main();
