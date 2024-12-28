-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 07:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category`) VALUES
(3, 'soap', 45.00, 'sdsfbgnhgmgjmmcv', 'Beauty_products'),
(8, 'webhook hari', 555.00, 'dngdnfmhmfmfhmfhmdfcm', 'Books'),
(10, 'Smartphone A1', 299.99, 'A budget-friendly smartphone with essential features.', 'electronics'),
(11, 'Smartphone B2', 499.99, 'A mid-range smartphone with excellent camera quality.', 'electronics'),
(12, 'Laptop X1', 899.99, 'A lightweight and portable laptop with high performance.', 'electronics'),
(13, 'Tablet Y2', 199.99, 'A compact tablet perfect for reading and browsing.', 'electronics'),
(14, 'Headphones Z1', 59.99, 'Noise-cancelling headphones with superior sound quality.', 'electronics'),
(15, 'Smartwatch W3', 129.99, 'A stylish smartwatch with health tracking features.', 'electronics'),
(16, 'Bluetooth Speaker V4', 49.99, 'A portable speaker with great sound and long battery life.', 'electronics'),
(17, 'Gaming Mouse G5', 29.99, 'An ergonomic gaming mouse with customizable buttons.', 'electronics'),
(18, 'Monitor H6', 179.99, 'A 24-inch monitor with full HD resolution.', 'electronics'),
(19, 'Keyboard J7', 39.99, 'A mechanical keyboard with RGB lighting.', 'electronics'),
(20, 'External HDD K8', 89.99, 'A 1TB external hard drive for extra storage.', 'electronics'),
(21, 'Router L9', 69.99, 'A high-speed Wi-Fi router with extended range.', 'electronics'),
(22, 'Webcam M10', 39.99, 'A full HD webcam for video conferencing.', 'electronics'),
(23, 'Smart Light Bulb N11', 19.99, 'A smart bulb compatible with voice assistants.', 'electronics'),
(24, 'Portable SSD P12', 129.99, 'A 500GB portable SSD with ultra-fast transfer speeds.', 'electronics'),
(25, 'Action Camera Q13', 149.99, 'A compact action camera with 4K recording.', 'electronics'),
(26, 'Fitness Tracker R14', 49.99, 'A fitness tracker with step and sleep monitoring.', 'electronics'),
(27, 'Wireless Charger S15', 29.99, 'A fast wireless charger for compatible devices.', 'electronics'),
(28, 'VR Headset T16', 399.99, 'An immersive VR headset for gaming and experiences.', 'electronics'),
(29, 'Drone U17', 599.99, 'A high-performance drone with a 4K camera.', 'electronics');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
