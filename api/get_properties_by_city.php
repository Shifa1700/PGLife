<?php
session_start();

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header('Content-Type: application/json');

require "../includes/database_connect.php";

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : NULL;
$city_name = trim($_GET["city"] ?? "");
$budget = filter_input(INPUT_GET, "budget", FILTER_VALIDATE_INT);
$gender = $_GET["gender"] ?? "";
$sql = "SELECT p.*, c.name AS city_name,
    (SELECT COUNT(*) FROM $interest_table i WHERE i.property_id = p.id) AS interested_users_count,
    EXISTS(SELECT 1 FROM $interest_table i WHERE i.property_id = p.id AND i.user_id = ?) AS is_interested
    FROM properties p INNER JOIN cities c ON c.id = p.city_id";
$conditions = array();
$types = "i";
$values = array($user_id ?: 0);
if ($city_name !== "") {
    $conditions[] = "c.name = ?";
    $types .= "s";
    $values[] = $city_name;
}
if ($budget !== false && $budget !== null && $budget > 0) {
    $conditions[] = "p.rent <= ?";
    $types .= "i";
    $values[] = $budget;
}
if (in_array($gender, array("male", "female", "unisex"), true)) {
    $conditions[] = "p.gender = ?";
    $types .= "s";
    $values[] = $gender;
}
if (count($conditions) > 0) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}
$sql .= " ORDER BY p.id DESC";
$statement = mysqli_prepare($conn, $sql);
if (!$statement) {
    echo json_encode(array("success" => false, "message" => "Unable to load properties."));
    exit;
}
$bind = array($types);
foreach ($values as $key => $value) {
    $bind[] = &$values[$key];
}
call_user_func_array(array($statement, 'bind_param'), $bind);
mysqli_stmt_execute($statement);
$result = mysqli_stmt_get_result($statement);
$properties = mysqli_fetch_all($result, MYSQLI_ASSOC);
$new_properties = array();
foreach ($properties as $property) {
    $property_images = glob("../img/properties/" . $property['id'] . "/*");
    $property['image'] = count($property_images)
        ? "img/properties/" . $property['id'] . "/" . basename($property_images[0])
        : "img/bg.png";
    $new_properties[] = $property;
}
echo json_encode($new_properties);
