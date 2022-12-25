import supertest from "supertest";
import { expect } from "chai";

/** BODY CREAR PRODUCTO **/
const bodyCreate = {
  name: "regla",
  description: "regla larga roja",
  code: "12313",
  image:
    "https://img.freepik.com/vector-premium/regla-centimetrica-icono-garabato-vectorial-suministros-oficina_499739-886.jpg?w=2000",
  price: 5000,
  stock: 50,
};

describe("prueba productos", () => {
  const request = supertest("http://localhost:5000/productos");

  /** LISTAR PRODUCTOS **/

  describe("- Listar productos", () => {
    it("debería retornar status 200", async () => {
      const response = await request.get("/");
      expect(response.status).eql(200);
    });
  });

  /** CREAR PRODUCTOS  **/

  describe("- Crear producto", () => {
    it("debería retornar status 201", async () => {
      const response = await request.post("/create").send(bodyCreate);
      expect(response.status).eql(201);
    });
  });

  /** ACTUALIZAR PRODUCTOS  **/

  describe("- Actualizar producto", () => {
    it("debería retornar status 200", async () => {
      const response = await request
        .put("/63a301c8162406d9a8bea8b8")
        .send(bodyCreate);
      expect(response.status).eql(200);
    });
  });

  /** ELIMINAR PRODUCTOS  **/

  describe("- Eliminar producto", () => {
    it("debería retornar status 200", async () => {
      const response = await request.delete("/63a301c8162406d9a8bea8b8");
      expect(response.status).eql(200);
    });
  });
});