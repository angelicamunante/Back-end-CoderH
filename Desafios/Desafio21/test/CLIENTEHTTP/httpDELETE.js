import axios from "axios";

axios
  .delete("http://localhost:5000/productos/632c7cf57b78ac4479fc40c5")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });