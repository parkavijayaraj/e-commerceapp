import Product from "@/models/Product";

export const createProduct = async (data, userId) => {
  return await Product.create({ ...data, createdBy: userId });
};

export const getProducts = async () => {
  return await Product.find();
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};


