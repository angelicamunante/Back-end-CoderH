const nombre = String;
const apellido = String;
const libros = [];
const mascotas = []

class Usuario {
  constructor ( nombre , apellido , libros ,  mascotas ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas
  }
  
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota)
  }

  countMascotas() {
    return `${this.mascotas.length}`
  }

  addBook(nombre , autor) {
    const obj = {
      nombre: nombre,
      autor: autor
    };
    this.libros.push(obj)
  }

  getBookNames() {
    libros.map(function(libro){
      return `${libro.nombre}`
    })
  }

}
