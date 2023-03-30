import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "../files/productos.json";
  }

  // let product = {
  //   title: title,
  //   description: description,
  //   price: price,
  //   thumbnail: thumbnail,
  //   code: code,
  //   stock: stock,
  //   id: ++id_code,
  // };

  addProduct = async (product) => {
    await this.getProducts();
    let id_code = 0;

    if (this.products.length > 0) {
      id_code = this.products[this.products.length - 1].id_code;
    }

    if (!this.validCode(product.code)) {
      console.log("El producto ya existe");
    } else if (
      !!product.title &&
      !!product.description &&
      !!product.price &&
      !!product.thumbnail &&
      !!product.code &&
      !!product.stock
    ) {
      product.id_code = ++id_code;
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return this.products;
    } else {
      console.log("Todos los campos son necesarios");
    }
  };

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
    } else {
      this.products = [];
    }
    return this.products;
  };

  getProductById = async (id) => {
    await this.getProducts();
    let product = this.products.find((product) => product.id_code === id);
    if (!!product) {
      return product;
    } else {
      console.error("Not found");
    }
  };

  validCode(code) {
    let valid = true;

    if (this.products.length > 0) {
      let product = this.products.find((product) => product.code === code);
      if (!!product) {
        valid = false;
      }
    }
    return valid;
  }

  updateProduct = async (newProduct, id) => {
    if (
      !!newProduct.title &&
      !!newProduct.description &&
      !!newProduct.price &&
      !!newProduct.thumbnail &&
      !!newProduct.code &&
      !!newProduct.stock
    ) {
      await this.getProducts();

      this.products.forEach((product, index) => {
        if (product.id_code === id) {
          newProduct.id_code = id;
          this.products[index] = newProduct;
        }
      });

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return this.products;
    } else {
      console.log("Todos los campos son necesarios");
    }
  };

  deleteProduct = async (id) => {
    await this.getProducts();
    this.products = this.products.filter((product) => product.id_code !== id);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
    return this.products;
  };
}

/*test: */
let productTest = new ProductManager();
console.log("*******************GetProductById*******************");
console.log(await productTest.getProductById(0));

console.log("*******************GetProducts*******************");
console.log(await productTest.getProducts());

let product = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
};

console.log("*******************addProduct*******************");
await productTest.addProduct(product);

console.log("*******************getProducts*******************");
console.log(await productTest.getProducts());

console.log("*******************addProduct*******************");
product = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
};

await productTest.addProduct(product);
console.log("*******************GetProductById*******************");
console.log(await productTest.getProductById(1));

console.log("*******************addProduct*******************");
product = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc1234",
  stock: 25,
};

await productTest.addProduct(product);

console.log("*******************GetProducts*******************");
console.log(await productTest.getProducts());
console.log(productTest.products);

console.log("*******************updateProduct*******************");
product = {
  title: "producto update",
  description: "Este es un producto update",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc1234",
  stock: 25,
};
console.log(await productTest.updateProduct(product, 1));

console.log("*******************deleteProduct*******************");
console.log(await productTest.deleteProduct(3));
