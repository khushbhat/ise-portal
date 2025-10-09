-- Create database
CREATE DATABASE IF NOT EXISTS ise_department;
USE ise_department;

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT INTO admins (email, password) VALUES ('hod@rit.edu', 'admin123');

-- Home content table
CREATE TABLE IF NOT EXISTS home_content (
  id INT PRIMARY KEY,
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  about_title VARCHAR(255),
  about_description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default home content
INSERT INTO home_content (id, hero_title, hero_subtitle, about_title, about_description) VALUES 
(1, 'Department of ISE at Ramaiah Institute of Technology', 'Building Tomorrow\'s Technology Leaders', 'Welcome to ISE Department', 'The Department of Information Science & Engineering at RIT is committed to excellence in education and research.');

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- About content table
CREATE TABLE IF NOT EXISTS about_content (
  id INT PRIMARY KEY,
  vision TEXT,
  mission TEXT,
  department_profile TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default about content
INSERT INTO about_content (id, vision, mission, department_profile) VALUES 
(1, 
'To be a center of excellence in Information Science & Engineering education and research, nurturing innovative professionals who contribute to society.',
'To provide quality education in Information Science & Engineering through innovative teaching-learning practices, foster research and development, and develop ethical professionals.',
'The Department of Information Science & Engineering at Ramaiah Institute of Technology was established to meet the growing demand for skilled IT professionals. The department offers undergraduate and postgraduate programs with state-of-the-art infrastructure and experienced faculty.'
);

-- Faculty table
CREATE TABLE IF NOT EXISTS faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  qualification VARCHAR(255),
  specialization TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research table
CREATE TABLE IF NOT EXISTS research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255),
  publication VARCHAR(255),
  year INT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activity_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOS members table
CREATE TABLE IF NOT EXISTS bos_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  organization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOE members table
CREATE TABLE IF NOT EXISTS boe_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  organization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(500),
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
