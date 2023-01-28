async function getProducts(req, res) {
  res.send("getProducts");
}

async function getProduct(req, res) {
  res.send("getProduct");
}

async function createProduct(req, res) {
  res.send("createProduct");
}

async function deleteProduct(req, res) {
  res.send("deleteProduct");
}

async function updateProduct(req, res) {
  res.send("updateProduct");
}

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
