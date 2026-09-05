<?php
session_start();
require("../includes/database_connect.php");

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$statement = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
mysqli_stmt_bind_param($statement, "s", $email);
mysqli_stmt_execute($statement);
$result = mysqli_stmt_get_result($statement);
if (!$result) {
    $response = array("success" => false, "message" => "Something went wrong!");
    echo json_encode($response);
    return;
}

$row_count = mysqli_num_rows($result);
if ($row_count == 0) {
    $response = array("success" => false, "message" => "Login failed! Invalid email or password.");
    echo json_encode($response);
    return;
}

$row = mysqli_fetch_assoc($result);
if (!password_verify($password, $row['password']) && !hash_equals($row['password'], sha1($password))) {
    echo json_encode(array("success" => false, "message" => "Login failed! Invalid email or password."));
    exit;
}
if (strlen($row['password']) === 40) {
    $new_password = password_hash($password, PASSWORD_DEFAULT);
    $upgrade = mysqli_prepare($conn, "UPDATE users SET password = ? WHERE id = ?");
    mysqli_stmt_bind_param($upgrade, "si", $new_password, $row['id']);
    mysqli_stmt_execute($upgrade);
}
$_SESSION['user_id'] = $row['id'];
$_SESSION['full_name'] = $row['full_name'];
$_SESSION['email'] = $row['email'];

$response = array("success" => true, "message" => "Login successful!");
echo json_encode($response);
mysqli_close($conn);
