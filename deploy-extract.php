<?php
// One-time deploy helper — extracts dist.zip then deletes itself
// Visit: calldomdelcaribe.com/deploy-extract.php?key=CALLDOM2026
if (!isset($_GET['key']) || $_GET['key'] !== 'CALLDOM2026') {
    http_response_code(403);
    exit('403');
}

$zipPath = __DIR__ . '/dist.zip';
$targetDir = __DIR__ . '/';

if (!file_exists($zipPath)) {
    exit('ERROR: dist.zip not found at ' . $zipPath);
}

$zip = new ZipArchive();
$result = $zip->open($zipPath);
if ($result !== TRUE) {
    exit('ERROR: Cannot open zip (code ' . $result . ')');
}

$zip->extractTo($targetDir);
$zip->close();

// Self-delete so it is not a permanent security hole
@unlink(__FILE__);

echo "DEPLOYED OK — dist/ extracted (" . count(glob($targetDir . 'dist/assets/*')) . " assets). This file has been deleted.";
