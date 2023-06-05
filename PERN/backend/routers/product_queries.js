const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'product_db',
    password: 'root',
    port: 7000,
})
const getAllProduct = async (res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM product');
      res.status(200).json({ status: 'success', result: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed' });
    }
  };

  const addProduct = async ({title, category, price, created_at, image}, res) => {
    try {
      await pool.query('INSERT INTO product (id, title, category, price, created_at, image) VALUES ($1, $2, $3, $4, $5, $6)', [2, title, category, price, created_at, image]);
      res.status(201).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed' });
      throw error;
    }
  }
  
  const getProductById = async (id) => {
    try {
      const { rows } = await pool.query('SELECT * FROM product WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  const getProductByCategory = async (category) => {
    try {
      const { rows } = await pool.query('SELECT * FROM product WHERE category = $1', [category]);
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const getPopularProduct = async () => {
    try {
      const { rows } = await pool.query(`
        SELECT p.*, COUNT(r.id) AS popularity
        FROM product p
        LEFT JOIN reviews r ON p.id = r.product_id
        GROUP BY p.id
        ORDER BY popularity DESC
        LIMIT 10
      `);
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const searchProduct = async (query) => {
    try {
      const { rows } = await pool.query(`
        SELECT *
        FROM product
        WHERE name ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%'
        ORDER BY name ASC
      `, [query]);
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const addToCart = async (productId, quantity, userId) => {
    try {
      await pool.query('INSERT INTO cart (product_id, quantity, user_id) VALUES ($1, $2, $3)', [productId, quantity, userId]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  module.exports = {
    getAllProduct,
    getProductById,
    getProductByCategory,
    getPopularProduct,
    searchProduct,
    addToCart,
    addProduct
  };