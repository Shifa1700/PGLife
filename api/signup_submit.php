<?php
header('Content-Type: application/json');
require("../includes/database_connect.php");

$full_name = trim($_POST['full_name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$college_name = trim($_POST['college_name'] ?? '');
$gender = $_POST['gender'] ?? '';
if ($full_name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6 ||
    $phone === '' || $college_name === '' || !in_array($gender, array('male', 'female', 'unisex'), true)) {
    echo json_encode(array("success" => false, "message" => "Please provide valid details. Passwords must be at least 6 characters."));
    exit;
}

$check = mysqli_prepare($conn, "SELECT id FROM users WHERE email = ?");
mysqli_stmt_bind_param($check, "s", $email);
mysqli_stmt_execute($check);
if (mysqli_stmt_get_result($check)->num_rows > 0) {
    $response = array("success" => false, "message" => "This email id is already registered with us!");
    echo json_encode($response);
    return;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);
$statement = mysqli_prepare($conn, "INSERT INTO users (email, password, full_name, phone, gender, college_name) VALUES (?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($statement, "ssssss", $email, $password_hash, $full_name, $phone, $gender, $college_name);
if (!$statement || !mysqli_stmt_execute($statement)) {
    $response = array("success" => false, "message" => "Something went wrong!");
    echo json_encode($response);
    return;
}

$response = array("success" => true, "message" => "Your account has been created successfully!");
echo json_encode($response);
mysqli_close($conn);
