const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ise_department',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    let query, params;
    if (role === 'hod') {
      query = 'SELECT * FROM admins WHERE email = ? AND password = ? AND role = ?';
      params = [email, password, 'hod'];
    } else {
      query = 'SELECT fu.*, f.name, f.designation FROM faculty_users fu LEFT JOIN faculty f ON fu.faculty_id = f.id WHERE fu.email = ? AND fu.password = ?';
      params = [email, password];
    }
    
    const [rows] = await pool.query(query, params);
    
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0], role: role || 'faculty' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== FACULTY USERS MANAGEMENT ====================
app.get('/api/faculty-users', async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT fu.*, f.name, f.designation 
      FROM faculty_users fu 
      LEFT JOIN faculty f ON fu.faculty_id = f.id
      ORDER BY fu.created_at DESC
    `);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/faculty-users', async (req, res) => {
  const { email, password, faculty_id } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO faculty_users (email, password, faculty_id, role) VALUES (?, ?, ?, ?)',
      [email, password, faculty_id, 'faculty']
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/faculty-users/:id', async (req, res) => {
  const { email, password, faculty_id } = req.body;
  
  try {
    await pool.query(
      'UPDATE faculty_users SET email = ?, password = ?, faculty_id = ? WHERE id = ?',
      [email, password, faculty_id, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/faculty-users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM faculty_users WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SETTINGS MANAGEMENT ====================
app.get('/api/settings/:key', async (req, res) => {
  try {
    const [settings] = await pool.query(
      'SELECT setting_value FROM settings WHERE setting_key = ?',
      [req.params.key]
    );
    res.json(settings[0] || { setting_value: '' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/:key', async (req, res) => {
  const { value } = req.body;
  
  try {
    await pool.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
      [req.params.key, value, value]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== HOME CONTENT ROUTES ====================
app.get('/api/home', async (req, res) => {
  try {
    const [content] = await pool.query('SELECT * FROM home_content WHERE id = 1');
    const [announcements] = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    
    res.json({
      content: content[0] || {},
      announcements: announcements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/home', async (req, res) => {
  const { heroTitle, heroSubtitle, aboutTitle, aboutDescription } = req.body;
  
  try {
    await pool.query(
      `INSERT INTO home_content (id, hero_title, hero_subtitle, about_title, about_description) 
       VALUES (1, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE hero_title = ?, hero_subtitle = ?, about_title = ?, about_description = ?`,
      [heroTitle, heroSubtitle, aboutTitle, aboutDescription, heroTitle, heroSubtitle, aboutTitle, aboutDescription]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ANNOUNCEMENTS ROUTES ====================
app.get('/api/announcements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO announcements (title, description) VALUES (?, ?)',
      [title, description]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/announcements/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM announcements WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ABOUT ROUTES ====================
app.get('/api/about', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM about_content WHERE id = 1');
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/about', async (req, res) => {
  const { vision, mission, departmentProfile } = req.body;
  
  try {
    await pool.query(
      `INSERT INTO about_content (id, vision, mission, department_profile) 
       VALUES (1, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE vision = ?, mission = ?, department_profile = ?`,
      [vision, mission, departmentProfile, vision, mission, departmentProfile]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== FACULTY ROUTES ====================
app.get('/api/faculty', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faculty ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/faculty/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faculty WHERE id = ?', [req.params.id]);
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  const { name, designation, qualification, specialization, email, phone, image, is_hod } = req.body;
  
  try {
    // If setting as HoD, remove HoD status from others
    if (is_hod) {
      await pool.query('UPDATE faculty SET is_hod = FALSE');
    }
    
    const [result] = await pool.query(
      'INSERT INTO faculty (name, designation, qualification, specialization, email, phone, image, is_hod) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, designation, qualification, specialization, email, phone, image, is_hod || false]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/faculty/:id', async (req, res) => {
  const { name, designation, qualification, specialization, email, phone, image, is_hod, education, subjects_taught, funded_projects, honours_achievements, memberships, patents, workshops_attended } = req.body;
  
  try {
    // If setting as HoD, remove HoD status from others
    if (is_hod) {
      await pool.query('UPDATE faculty SET is_hod = FALSE WHERE id != ?', [req.params.id]);
    }
    
    await pool.query(
      `UPDATE faculty SET 
        name = ?, designation = ?, qualification = ?, specialization = ?, 
        email = ?, phone = ?, image = ?, is_hod = ?,
        education = ?, subjects_taught = ?, funded_projects = ?, 
        honours_achievements = ?, memberships = ?, patents = ?, workshops_attended = ?
      WHERE id = ?`,
      [name, designation, qualification, specialization, email, phone, image, is_hod || false,
       education, subjects_taught, funded_projects, honours_achievements, memberships, patents, workshops_attended,
       req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/faculty/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM faculty WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== RESEARCH ROUTES ====================
app.get('/api/research', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM research ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/research', async (req, res) => {
  const { title, author, publication, year, description } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO research (title, author, publication, year, description) VALUES (?, ?, ?, ?, ?)',
      [title, author, publication, year, description]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/research/:id', async (req, res) => {
  const { title, author, publication, year, description } = req.body;
  
  try {
    await pool.query(
      'UPDATE research SET title = ?, author = ?, publication = ?, year = ?, description = ? WHERE id = ?',
      [title, author, publication, year, description, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/research/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM research WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== EVENTS ROUTES ====================
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY event_date DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  const { title, description, event_date, location } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO events (title, description, event_date, location) VALUES (?, ?, ?, ?)',
      [title, description, event_date, location]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  const { title, description, event_date, location } = req.body;
  
  try {
    await pool.query(
      'UPDATE events SET title = ?, description = ?, event_date = ?, location = ? WHERE id = ?',
      [title, description, event_date, location, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ACHIEVEMENTS ROUTES ====================
app.get('/api/achievements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/achievements', async (req, res) => {
  const { title, description, category } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO achievements (title, description, category) VALUES (?, ?, ?)',
      [title, description, category]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/achievements/:id', async (req, res) => {
  const { title, description, category } = req.body;
  
  try {
    await pool.query(
      'UPDATE achievements SET title = ?, description = ?, category = ? WHERE id = ?',
      [title, description, category, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/achievements/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM achievements WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ACTIVITIES ROUTES ====================
app.get('/api/activities', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activities ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/activities', async (req, res) => {
  const { title, description, activity_date } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO activities (title, description, activity_date) VALUES (?, ?, ?)',
      [title, description, activity_date]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/activities/:id', async (req, res) => {
  const { title, description, activity_date } = req.body;
  
  try {
    await pool.query(
      'UPDATE activities SET title = ?, description = ?, activity_date = ? WHERE id = ?',
      [title, description, activity_date, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/activities/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM activities WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== BOS ROUTES ====================
app.get('/api/bos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bos_members ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bos', async (req, res) => {
  const { name, designation, organization } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO bos_members (name, designation, organization) VALUES (?, ?, ?)',
      [name, designation, organization]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/bos/:id', async (req, res) => {
  const { name, designation, organization } = req.body;
  
  try {
    await pool.query(
      'UPDATE bos_members SET name = ?, designation = ?, organization = ? WHERE id = ?',
      [name, designation, organization, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/bos/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM bos_members WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== BOE ROUTES ====================
app.get('/api/boe', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM boe_members ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/boe', async (req, res) => {
  const { name, designation, organization } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO boe_members (name, designation, organization) VALUES (?, ?, ?)',
      [name, designation, organization]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/boe/:id', async (req, res) => {
  const { name, designation, organization } = req.body;
  
  try {
    await pool.query(
      'UPDATE boe_members SET name = ?, designation = ?, organization = ? WHERE id = ?',
      [name, designation, organization, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/boe/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM boe_members WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== RESOURCES ROUTES ====================
app.get('/api/resources', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM resources ORDER BY title');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/resources', async (req, res) => {
  const { title, description, link, icon } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO resources (title, description, link, icon) VALUES (?, ?, ?, ?)',
      [title, description, link, icon]
    );
    
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/resources/:id', async (req, res) => {
  const { title, description, link, icon } = req.body;
  
  try {
    await pool.query(
      'UPDATE resources SET title = ?, description = ?, link = ?, icon = ? WHERE id = ?',
      [title, description, link, icon, req.params.id]
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/resources/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM resources WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
