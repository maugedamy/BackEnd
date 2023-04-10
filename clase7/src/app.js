import express from "express";

import ProductManager from "./ProductManager/ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const productManager = new ProductManager();

app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));

app.get("/products", async (req, res) => {
  const unlimitedProducts = await productManager.getProducts();
  const limit = req.query.limit || unlimitedProducts.length;

  const products = unlimitedProducts.slice(0, limit);
  res.send(products);
});

app.get("/products/:pid", async (req, res) => {
  console.log("id ...");
  const pid = req.params.pid;
  const product = await productManager.getProduct(pid);
  res.send(product);
});
