class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let id_code = this.getProducts().length;

    if (!this.validCode(code)) {
      console.log("El producto ya existe");
    } else if (
      //this.validCode(code) &&
      !!title &&
      !!description &&
      !!price &&
      !!thumbnail &&
      !!code &&
      !!stock
    ) {
      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++id_code,
      };
      this.products.push(product);
      return this.products;
    } else {
      console.log("Todos los campos son necesarios");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((product) => product.id === id);
    if (!!product) {
      return product;
    } else {
      console.error("Not found");
    }
  }

  validCode(code) {
    let product = this.products.find((product) => product.code === code);
    if (!!product) {
      return false;
    } else {
      return true;
    }
  }
}

/*test: */

let productTest = new ProductManager();
console.log("GetProducts");
console.log(productTest.getProducts());

productTest.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(productTest.getProducts());

productTest.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(productTest.getProductById(0));
console.log("GetProductById");
console.log(productTest.getProductById(1));

productTest.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "sin imagen",
  "abc1234",
  25
);
console.log("GetProducts");
console.log(productTest.getProducts());
