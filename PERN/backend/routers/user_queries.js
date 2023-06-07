const { addOpData } = require('./operationController');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'product_db',
    password: 'root',
    port: 7000,
})
const getAllUser = async (res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      res.status(200).json({ status: 'success', result: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed' });
    }
  };

  const addUser = async ({name, email, password}, res) => {
    try {
      const start = new Date();
      await pool.query('INSERT INTO product (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
      const end = new Date();
      const elapsed = Math.abs(end.getTime() - start.getTime()) / 1000;
      // console.log("Elapsed time: ", elapsed);
      let operationData = {
        name: "ADD",
        time: elapsed,
        description: "Add User operation",
        stack: "PERN",
        created_at: new Date(),
      };

      addOpData(operationData)
        .then((result) => {
          console.log("Operation Data Saved");
        })
        .catch((err) => {
          console.error("Error saving operation data", err);
        });
      res.status(201).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failed' });
      throw error;
    }
  }
  
  const authenticate = async ({email, password}) => {
    try {
      const { rows } = await pool.query('SELECT email, password FROM users WHERE email = $1 AND password = $2', [email, password]);
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