import axios from "axios";

const body = {
  name: "regla blanca",
  description: "regla larga blanca",
  code: "12413",
  image:
    "https://img.freepik.com/vector-premium/regla-centimetrica-icono-garabato-vectorial-suministros-oficina_499739-886.jpg?w=2000",
  price: 5000,
  stock: 50,
};

axios
  .put(`http://localhost:5000/productos/63a301c8162406d9a8bea8b8`, body)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });