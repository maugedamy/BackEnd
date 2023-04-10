import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./files/products.json";
  }

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

  getProduct = async (id) => {
    const products = await this.getProducts();
    const product = products.filter((product) => {
      return product.id_code == id;
    });

    return product;
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

let newProducts = new ProductManager();

let Ana = {
  title: "Borcego Ana",
  description: "Borcego cuero",
  price: 8000,
  thumbnail: "sin imagen",
  code: "10",
  stock: 25,
};

let Paris = {
  title: "Botas Paris",
  description: "Botas de ecocuero",
  price: 12000,
  thumbnail: "sin imagen",
  code: "11",
  stock: 25,
};

let London = {
  title: "Botas London",
  description: "Botas de cuero",
  price: 18000,
  thumbnail: "sin imagen",
  code: "12",
  stock: 25,
};

let Greece = {
  title: "Zapas Greece",
  description: "Zapatillas urbanas",
  price: 10000,
  thumbnail: "sin imagen",
  code: "13",
  stock: 25,
};

let Tartaro = {
  title: "Botas Tartaro",
  description: "Botas de cuero",
  price: 28000,
  thumbnail: "sin imagen",
  code: "14",
  stock: 25,
};

let Munich = {
  title: "Borcego Munich",
  description: "Borcego cuero",
  price: 12000,
  thumbnail: "sin imagen",
  code: "15",
  stock: 25,
};

let Macchu = {
  title: "Zapatillas Macchu",
  description: "Zapatillas urbanas",
  price: 8000,
  thumbnail: "sin imagen",
  code: "16",
  stock: 25,
};

let Becca = {
  title: "Botas Becca",
  description: "Botas de cuero",
  price: 12500,
  thumbnail: "sin imagen",
  code: "17",
  stock: 25,
};

let Jules = {
  title: "Borcego Jules",
  description: "Borcego de cuero",
  price: 12000,
  thumbnail: "sin imagen",
  code: "18",
  stock: 25,
};

let Oxford = {
  title: "Botas Oxford",
  description: "Botas de cuero",
  price: 28000,
  thumbnail: "sin imagen",
  code: "19",
  stock: 25,
};

await newProducts.addProduct(Ana);
await newProducts.addProduct(Paris);
await newProducts.addProduct(London);
await newProducts.addProduct(Greece);
await newProducts.addProduct(Tartaro);
await newProducts.addProduct(Munich);
await newProducts.addProduct(Macchu);
await newProducts.addProduct(Becca);
await newProducts.addProduct(Jules);
await newProducts.addProduct(Oxford);
