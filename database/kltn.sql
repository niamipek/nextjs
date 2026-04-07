-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2026 at 02:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kltn`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartitems`
--

CREATE TABLE `cartitems` (
  `CartItem_ID` varchar(20) NOT NULL,
  `Cart_ID` varchar(20) DEFAULT NULL,
  `Variant_ID` varchar(20) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL CHECK (`Quantity` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `Cart_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Category_ID` varchar(20) NOT NULL,
  `Category_Name` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `User_ID` varchar(20) NOT NULL,
  `Total_Spent` decimal(15,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `User_ID` varchar(20) NOT NULL,
  `Store_ID` varchar(20) NOT NULL,
  `Employee_Code` varchar(15) DEFAULT NULL,
  `Supervisor_ID` varchar(20) DEFAULT NULL,
  `Hire_Date` date DEFAULT NULL,
  `Salary_Base` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `Store_ID` varchar(20) NOT NULL,
  `Variant_ID` varchar(20) NOT NULL,
  `Stock_Quantity` int(11) DEFAULT 0,
  `Last_Updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetails_ID` varchar(20) NOT NULL,
  `Order_ID` varchar(20) DEFAULT NULL,
  `Variant_ID` varchar(20) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL CHECK (`Quantity` > 0),
  `Unit_Price` decimal(12,2) DEFAULT NULL,
  `Return_Quantity` int(11) DEFAULT 0,
  `Return_Reason` varchar(255) DEFAULT NULL,
  `Return_Date` datetime DEFAULT NULL,
  `Return_Status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Voucher_ID` varchar(50) DEFAULT NULL,
  `Total_Amount` decimal(15,2) DEFAULT NULL,
  `Shipping_Address` varchar(255) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `Order_Date` datetime DEFAULT current_timestamp(),
  `Payment_Method` varchar(50) DEFAULT NULL,
  `Payment_Status` varchar(20) DEFAULT NULL,
  `Shipping_Fee` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Product_ID` varchar(20) NOT NULL,
  `Category_ID` varchar(20) DEFAULT NULL,
  `Product_Name` varchar(150) NOT NULL,
  `Description` text DEFAULT NULL,
  `Base_Price` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `Variant_ID` varchar(20) NOT NULL,
  `Product_ID` varchar(20) DEFAULT NULL,
  `Color` varchar(150) DEFAULT NULL,
  `Size` text DEFAULT NULL,
  `Image_URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `Promotion_ID` varchar(20) NOT NULL,
  `Promo_Name` varchar(255) DEFAULT NULL,
  `Discount_Type` tinyint(4) DEFAULT NULL,
  `Discount_Value` decimal(10,2) DEFAULT NULL,
  `Start_Date` datetime DEFAULT NULL,
  `End_Date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotion_details`
--

CREATE TABLE `promotion_details` (
  `Promotion_ID` varchar(20) NOT NULL,
  `Variant_ID` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `Review_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Product_ID` varchar(20) DEFAULT NULL,
  `Rating` tinyint(4) DEFAULT NULL CHECK (`Rating` between 1 and 5),
  `Comment_Text` longtext DEFAULT NULL,
  `Create_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `Role_ID` varchar(20) NOT NULL,
  `Role_Name` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `Schedule_ID` varchar(20) NOT NULL,
  `Employee_ID` varchar(20) DEFAULT NULL,
  `Store_ID` varchar(20) DEFAULT NULL,
  `Shift_ID` varchar(20) DEFAULT NULL,
  `Work_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `Shift_ID` varchar(20) NOT NULL,
  `Shift_Name` varchar(100) DEFAULT NULL,
  `Start_Time` time DEFAULT NULL,
  `End_Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_transfers`
--

CREATE TABLE `stock_transfers` (
  `Transfer_ID` varchar(20) NOT NULL,
  `From_Store_ID` varchar(20) DEFAULT NULL,
  `To_Store_ID` varchar(20) DEFAULT NULL,
  `Employee_ID` varchar(20) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  `Notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_transfer_details`
--

CREATE TABLE `stock_transfer_details` (
  `Transfer_ID` varchar(20) NOT NULL,
  `Variant_ID` varchar(20) NOT NULL,
  `Quantity` int(11) DEFAULT NULL CHECK (`Quantity` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `Store_ID` varchar(20) NOT NULL,
  `Manager_ID` varchar(20) DEFAULT NULL,
  `Store_Name` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Is_Central_Warehouse` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `Ticket_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_logs`
--

CREATE TABLE `system_logs` (
  `Log_ID` int(11) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Action_Name` varchar(255) DEFAULT NULL,
  `IP_Address` varchar(50) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `Setting_Key` varchar(100) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Setting_Value` text DEFAULT NULL,
  `Value_Type` varchar(20) DEFAULT NULL,
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Setting_Group` varchar(50) DEFAULT NULL,
  `Updated_At` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `timesheets`
--

CREATE TABLE `timesheets` (
  `Timesheet_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) DEFAULT NULL,
  `Schedule_ID` varchar(20) DEFAULT NULL,
  `Check_In` time DEFAULT NULL,
  `Check_Out` time DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `User_ID` varchar(20) NOT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password_Hash` varchar(255) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  `Avatar_URL` varchar(255) DEFAULT NULL,
  `Gender` char(10) DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_addresses`
--

CREATE TABLE `user_addresses` (
  `Address_ID` varchar(20) NOT NULL,
  `User_ID` varchar(20) NOT NULL,
  `Address_Line` varchar(255) NOT NULL,
  `Address_Type` varchar(20) DEFAULT NULL,
  `Is_Default` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `User_ID` varchar(20) NOT NULL,
  `Role_ID` varchar(20) NOT NULL,
  `Assigned_Date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `Voucher_ID` varchar(50) NOT NULL,
  `Promotion_ID` varchar(20) DEFAULT NULL,
  `Usage_Limit` int(11) DEFAULT 0,
  `Used_Count` int(11) DEFAULT 0,
  `Min_Order_Value` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD PRIMARY KEY (`CartItem_ID`),
  ADD KEY `Cart_ID` (`Cart_ID`),
  ADD KEY `Variant_ID` (`Variant_ID`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`Cart_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`User_ID`,`Store_ID`),
  ADD UNIQUE KEY `Employee_Code` (`Employee_Code`),
  ADD KEY `idx_user_id` (`User_ID`),
  ADD KEY `Store_ID` (`Store_ID`),
  ADD KEY `Supervisor_ID` (`Supervisor_ID`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`Store_ID`,`Variant_ID`),
  ADD KEY `Variant_ID` (`Variant_ID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetails_ID`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Variant_ID` (`Variant_ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Voucher_ID` (`Voucher_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_ID`),
  ADD KEY `Category_ID` (`Category_ID`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`Variant_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`Promotion_ID`);

--
-- Indexes for table `promotion_details`
--
ALTER TABLE `promotion_details`
  ADD PRIMARY KEY (`Promotion_ID`,`Variant_ID`),
  ADD KEY `Variant_ID` (`Variant_ID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Role_ID`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`Schedule_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`),
  ADD KEY `Store_ID` (`Store_ID`),
  ADD KEY `Shift_ID` (`Shift_ID`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`Shift_ID`);

--
-- Indexes for table `stock_transfers`
--
ALTER TABLE `stock_transfers`
  ADD PRIMARY KEY (`Transfer_ID`),
  ADD KEY `From_Store_ID` (`From_Store_ID`),
  ADD KEY `To_Store_ID` (`To_Store_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
  ADD PRIMARY KEY (`Transfer_ID`,`Variant_ID`),
  ADD KEY `Variant_ID` (`Variant_ID`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`Store_ID`),
  ADD KEY `Manager_ID` (`Manager_ID`);

--
-- Indexes for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`Ticket_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD PRIMARY KEY (`Log_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`Setting_Key`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD PRIMARY KEY (`Timesheet_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Schedule_ID` (`Schedule_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD PRIMARY KEY (`Address_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`User_ID`,`Role_ID`),
  ADD KEY `Role_ID` (`Role_ID`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`Voucher_ID`),
  ADD KEY `Promotion_ID` (`Promotion_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `Log_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitems`
--
ALTER TABLE `cartitems`
  ADD CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`Cart_ID`) REFERENCES `carts` (`Cart_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`Variant_ID`) REFERENCES `product_variants` (`Variant_ID`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`Store_ID`) REFERENCES `stores` (`Store_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`Supervisor_ID`) REFERENCES `employees` (`User_ID`) ON DELETE SET NULL;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`Store_ID`) REFERENCES `stores` (`Store_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`Variant_ID`) REFERENCES `product_variants` (`Variant_ID`) ON DELETE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `orders` (`Order_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`Variant_ID`) REFERENCES `product_variants` (`Variant_ID`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Voucher_ID`) REFERENCES `vouchers` (`Voucher_ID`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Category_ID`) REFERENCES `categories` (`Category_ID`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`) ON DELETE CASCADE;

--
-- Constraints for table `promotion_details`
--
ALTER TABLE `promotion_details`
  ADD CONSTRAINT `promotion_details_ibfk_1` FOREIGN KEY (`Promotion_ID`) REFERENCES `promotions` (`Promotion_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `promotion_details_ibfk_2` FOREIGN KEY (`Variant_ID`) REFERENCES `product_variants` (`Variant_ID`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`Store_ID`) REFERENCES `stores` (`Store_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`Shift_ID`) REFERENCES `shifts` (`Shift_ID`) ON DELETE CASCADE;

--
-- Constraints for table `stock_transfers`
--
ALTER TABLE `stock_transfers`
  ADD CONSTRAINT `stock_transfers_ibfk_1` FOREIGN KEY (`From_Store_ID`) REFERENCES `stores` (`Store_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_transfers_ibfk_2` FOREIGN KEY (`To_Store_ID`) REFERENCES `stores` (`Store_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_transfers_ibfk_3` FOREIGN KEY (`Employee_ID`) REFERENCES `users` (`User_ID`) ON DELETE SET NULL;

--
-- Constraints for table `stock_transfer_details`
--
ALTER TABLE `stock_transfer_details`
  ADD CONSTRAINT `stock_transfer_details_ibfk_1` FOREIGN KEY (`Transfer_ID`) REFERENCES `stock_transfers` (`Transfer_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `stock_transfer_details_ibfk_2` FOREIGN KEY (`Variant_ID`) REFERENCES `product_variants` (`Variant_ID`) ON DELETE CASCADE;

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`Manager_ID`) REFERENCES `users` (`User_ID`) ON DELETE SET NULL;

--
-- Constraints for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `support_tickets_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD CONSTRAINT `system_logs_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE SET NULL;

--
-- Constraints for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD CONSTRAINT `system_settings_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE SET NULL;

--
-- Constraints for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD CONSTRAINT `timesheets_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `timesheets_ibfk_2` FOREIGN KEY (`Schedule_ID`) REFERENCES `schedules` (`Schedule_ID`) ON DELETE CASCADE;

--
-- Constraints for table `user_addresses`
--
ALTER TABLE `user_addresses`
  ADD CONSTRAINT `user_addresses_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`Role_ID`) REFERENCES `roles` (`Role_ID`) ON DELETE CASCADE;

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`Promotion_ID`) REFERENCES `promotions` (`Promotion_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
