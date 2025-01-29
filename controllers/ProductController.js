import Product from '../models/Product.js';

// Get all products with search, filtering, and pagination
export const getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) whereClause.name = { [Op.like]: `%${search}%` };
    if (minPrice) whereClause.price = { ...whereClause.price, [Op.gte]: minPrice };
    if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: products.count,
      pages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      products: products.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
