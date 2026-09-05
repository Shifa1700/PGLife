CREATE DATABASE IF NOT EXISTS pglife CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pglife;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender ENUM('male', 'female', 'unisex') NOT NULL,
    college_name VARCHAR(180) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS properties (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city_id INT UNSIGNED NOT NULL,
    name VARCHAR(180) NOT NULL,
    address VARCHAR(255) NOT NULL,
    rent DECIMAL(10,2) NOT NULL,
    gender ENUM('male', 'female', 'unisex') NOT NULL,
    description TEXT NOT NULL,
    rating_clean DECIMAL(2,1) NOT NULL DEFAULT 0,
    rating_food DECIMAL(2,1) NOT NULL DEFAULT 0,
    rating_safety DECIMAL(2,1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_properties_city FOREIGN KEY (city_id) REFERENCES cities(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    INDEX idx_properties_city_rent (city_id, rent),
    INDEX idx_properties_gender (gender)
);

CREATE TABLE IF NOT EXISTS amenities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(40) NOT NULL,
    icon VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS property_amenities (
    property_id INT UNSIGNED NOT NULL,
    amenity_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (property_id, amenity_id),
    CONSTRAINT fk_property_amenities_property FOREIGN KEY (property_id) REFERENCES properties(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_property_amenities_amenity FOREIGN KEY (amenity_id) REFERENCES amenities(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interested_users (
    user_id INT UNSIGNED NOT NULL,
    property_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, property_id),
    CONSTRAINT fk_interested_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_interested_property FOREIGN KEY (property_id) REFERENCES properties(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id INT UNSIGNED NOT NULL,
    user_name VARCHAR(120) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_testimonials_property FOREIGN KEY (property_id) REFERENCES properties(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);
