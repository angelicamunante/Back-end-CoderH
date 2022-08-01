class Usuario {
  constructor ( nombre , apellido , libros ,  mascotas ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
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
    let nombreLibros = this.libros.map(function(libro) {
      return libro.nombre;
    });
    return nombreLibros;
  }
}

let usuario = new Usuario('Alvaro', 'Palacios', [], []);
console.log(usuario.getFullName())
usuario.addMascota('Yuna');
usuario.addMascota('Zeus')
console.log(usuario.countMascotas());
usuario.addBook('libro 1', 'autor 1');
usuario.addBook('libro 2', 'autor 2');
console.log(usuario.getBookNames());
