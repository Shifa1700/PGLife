<?php
mysqli_report(MYSQLI_REPORT_OFF);
$conn = mysqli_connect(
    getenv('PGLIFE_DB_HOST') ?: '127.0.0.1',
    getenv('PGLIFE_DB_USER') ?: 'root',
    getenv('PGLIFE_DB_PASSWORD') ?: '',
    getenv('PGLIFE_DB_NAME') ?: 'pglife'
);

if (!$conn) {
    http_response_code(503);
    die("Unable to connect to the PG Life database.");
}

mysqli_set_charset($conn, 'utf8mb4');

// Keep existing installations working while database.sql moves them to the
// names used by the current schema.
$interest_table = 'interested_users';
$amenity_link_table = 'property_amenities';
$tables = mysqli_query($conn, "SHOW TABLES");
$table_names = array();
if ($tables) {
    while ($table = mysqli_fetch_row($tables)) {
        $table_names[] = $table[0];
    }
}
if (!in_array('interested_users', $table_names, true) && in_array('interested_users_properties', $table_names, true)) {
    $interest_table = 'interested_users_properties';
}
if (!in_array('property_amenities', $table_names, true) && in_array('properties_amenities', $table_names, true)) {
    $amenity_link_table = 'properties_amenities';
}
