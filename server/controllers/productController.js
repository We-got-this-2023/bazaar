function getProducts(req, res) {
  res.send("getProducts");
}

function getProduct(req, res) {
  res.send("getProduct");
}

function createProduct(req, res) {
  res.send("createProduct");
}

function deleteProduct(req, res) {
  res.send("deleteProduct");
}

function updateProduct(req, res) {
  res.send("updateProduct");
}

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
