<?php
session_start();

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header('Content-Type: application/json');

require "../includes/database_connect.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(array("success" => false, "is_logged_in" => false));
    return;
}

$user_id = $_SESSION['user_id'];
$property_id = filter_input(INPUT_POST, "property_id", FILTER_VALIDATE_INT);
if (!$property_id) {
    $property_id = filter_input(INPUT_GET, "property_id", FILTER_VALIDATE_INT);
}
if (!$property_id) {
    echo json_encode(array("success" => false, "message" => "Invalid property."));
    exit;
}

$check = mysqli_prepare($conn, "SELECT 1 FROM $interest_table WHERE user_id = ? AND property_id = ?");
mysqli_stmt_bind_param($check, "ii", $user_id, $property_id);
mysqli_stmt_execute($check);
if (mysqli_stmt_get_result($check)->num_rows > 0) {
    $statement = mysqli_prepare($conn, "DELETE FROM $interest_table WHERE user_id = ? AND property_id = ?");
    $is_interested = false;
} else {
    $statement = mysqli_prepare($conn, "INSERT INTO $interest_table (user_id, property_id) VALUES (?, ?)");
    $is_interested = true;
}
mysqli_stmt_bind_param($statement, "ii", $user_id, $property_id);
if (!mysqli_stmt_execute($statement)) {
    echo json_encode(array("success" => false, "message" => "Unable to update shortlist."));
    exit;
}
echo json_encode(array("success" => true, "is_interested" => $is_interested, "property_id" => $property_id));
