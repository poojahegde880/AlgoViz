const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const port = 5500;

const app = express();
app.use(express.json());

// CORS setup for frontend
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

const con = mysql.createConnection({
  
  host: "localhost",
  user: "root",
  password: "",  // Update this to your MySQL password
  database: "algoviz"
});


con.connect(err => {
  if (err) {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database!');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    con.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      res.json({ message: "Registration successful" });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  con.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'No user found with that email' });
    }

    const user = results[0];
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (isMatch) {
        // Update the last_login time when the user successfully logs in
        const now = new Date();
        const sqlUpdateLogin = 'UPDATE users SET last_login = ? WHERE id = ?';
        
        con.query(sqlUpdateLogin, [now, user.id], (err, result) => {
          if (err) {
            console.log('Error updating login time:', err.message);
          } else {
            console.log('Login time updated:', result);
          }
        });

        res.json({ message: 'Login success', userId: user.id });
      } else {
        res.status(401).json({ message: 'Wrong password' });
      }
    });
  });
});

// GET Ratings by algorithm
// app.get('/ratings/:algorithm', (req, res) => {
//   const { algorithm } = req.params;

//   const query = `SELECT AVG(rating) AS averageRating, COUNT(*) AS ratingCount FROM ratings WHERE algorithm = ?`;

//   con.query(query, [algorithm], (err, results) => {
//     if (err) {
//       console.error("DB SELECT error:", err);
//       return res.status(500).json({ success: false, message: 'DB error' });
//     }

//     const avg = results[0].averageRating;
//     const count = results[0].ratingCount;

//     res.json({ 
//       success: true,
//       averageRating: avg ? parseFloat(avg.toFixed(2)) : 0,
//       ratingCount: count
//     });
//   });
// });

// POST rating
// POST rating
app.post('/ratings', (req, res) => {
  const { user_id, algorithm, rating } = req.body;

  console.log("Received Rating Data:", { user_id, algorithm, rating });  // Log incoming data

  if (!user_id || !algorithm || !rating) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = "INSERT INTO ratings (user_id, algorithm, rating) VALUES (?, ?, ?)";
  con.query(sql, [user_id, algorithm, rating], (err, result) => {
      if (err) {
          console.error("Error inserting rating:", err);
          return res.status(500).json({ success: false, message: "Database error" });
      }

      res.json({ success: true, message: "Rating submitted successfully" });
  });
});

// GET Ratings for specific algorithm
app.get('/ratings/:algorithm', (req, res) => {
  const { algorithm } = req.params;
  
  const query = `SELECT AVG(rating) AS averageRating, COUNT(*) AS ratingCount 
                 FROM ratings WHERE algorithm = ?`;

  con.query(query, [algorithm], (err, results) => {
      if (err) {
          console.error("Error fetching ratings:", err);
          return res.status(500).json({ success: false, message: 'Failed to fetch ratings' });
      }

      const avg = results[0].averageRating;
      const count = results[0].ratingCount;

      res.json({
          success: true,
          averageRating: avg ? parseFloat(avg.toFixed(2)) : 0, // Return average rating rounded to 2 decimals
          ratingCount: count
      });
  });
});


// Get all users for the admin dashboard
// app.get('/api/users', (req, res) => {
//   const query = 'SELECT id, name, email, last_login FROM users';

//   con.query(query, (err, results) => {
//       if (err) {
//           console.error('Error fetching users:', err);
//           return res.status(500).json({ error: 'Database error' });
//       }
//       res.json(results); // Send data to the frontend
//   });
// });

app.get('/api/users', (req, res) => {
  const searchQuery = req.query.search || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // The query with DATE_FORMAT function for last_login field
  const query = `
      SELECT id, name, email, last_login
      FROM users
      WHERE name LIKE ? OR email LIKE ?
      LIMIT ? OFFSET ?;
  `;
  
  // Parameters to replace the placeholders (?)
  con.query(query, [
      `%${searchQuery}%`,  // Search term for name and email
      `%${searchQuery}%`,  // Search term for name and email
      limit,               // Limit for pagination
      offset               // Offset for pagination
  ], (err, results) => {
      if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: 'Error fetching users' });
      }

      // Respond with the results from the query
      res.json(results);
  });
});

// GET all ratings (for admin dashboard)
app.get('/api/ratings', (req, res) => {
  const sql = `
  SELECT r.id, r.user_id, u.name, r.algorithm, r.rating, r.created_at
    FROM ratings r
    JOIN users u ON r.user_id = u.id
  `;

  con.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching ratings:', err);
      return res.status(500).json({ error: 'Failed to fetch ratings' });
    }
    res.json(results);
  });
});

// DELETE rating
app.delete('/api/ratings/:id', (req, res) => {
  const ratingId = req.params.id;

  if (!ratingId) {
    return res.status(400).json({ error: 'Rating ID is required' });
  }

  con.query('DELETE FROM ratings WHERE id = ?', [ratingId], (err, result) => {
    if (err) {
      console.error('Error while deleting rating:', err);
      return res.status(500).json({ error: 'Failed to delete rating' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  });
});


app.delete('/api/ratings/:id', (req, res) => {
  const ratingId = req.params.id;
  if (!ratingId) {
    return res.status(400).json({ error: 'Rating ID is required' });
  }

  con.query('DELETE FROM ratings WHERE id = ?', [ratingId], (err, result) => {
    if (err) {
      console.error('Error while deleting rating:', err);
      return res.status(500).json({ error: 'Failed to delete rating' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  });
});

app.post('/views/:algorithm', (req, res) => {
  const algorithmName = req.params.algorithm;
  console.log('Algorithm Name:', algorithmName);

  // Validate algorithm name to ensure it's a valid string
  if (!algorithmName || typeof algorithmName !== 'string' || algorithmName.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid algorithm name' 
    });
  }

  // SQL query to insert or update view count
  const updateQuery = `
    INSERT INTO algorithm_views (algorithm, view_count, last_updated)
    VALUES (?, 1, NOW())
    ON DUPLICATE KEY UPDATE 
      view_count = view_count + 1,
      last_updated = NOW()
  `;

  // Execute the query to update the view count
  con.query(updateQuery, [algorithmName], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to update view count' 
      });
    }

    console.log('Updated view count successfully for', algorithmName);

    // Fetch the updated view count to send as response
    const selectQuery = 'SELECT view_count FROM algorithm_views WHERE algorithm = ?';
    con.query(selectQuery, [algorithmName], (err, result) => {
      if (err) {
        console.error('Database error while fetching view count:', err);
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to fetch view count' 
        });
      }

      res.json({
        success: true,
        message: 'View count updated successfully',
        viewCount: result[0].view_count
      });
    });
  });
});




app.get('/api/algorithm-views', (req, res) => {
  const query = 'SELECT algorithm, view_count FROM algorithm_views';

  con.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching algorithm views:', err);
      return res.status(500).json({ error: 'Failed to fetch algorithm views' });
    }

    // Send data as JSON
    res.json(results); // results is already in JSON-compatible format
  });
});






app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
