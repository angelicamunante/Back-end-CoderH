import axios from "axios";

const body = {
  name: "regla",
  description: "regla larga roja",
  code: "12313",
  image:
    "https://img.freepik.com/vector-premium/regla-centimetrica-icono-garabato-vectorial-suministros-oficina_499739-886.jpg?w=2000",
  price: 5000,
  stock: 50,
};

axios
  .post("http://localhost:5000/productos/create", body)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });