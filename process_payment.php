<?php
// process_payment.php

// Collecting POST data
$merchant_id = $_POST['merchant_id'];
$merchant_key = $_POST['merchant_key'];
$amount = $_POST['amount'];
$return_url = $_POST['return_url'];
$cancel_url = $_POST['cancel_url'];
$notify_url = $_POST['notify_url'];

// PayFast Payment Request
$payfast_url = "https://www.payfast.co.za/eng/process";

$data = [
    'merchant_id' => $merchant_id,
    'merchant_key' => $merchant_key,
    'amount' => $amount,
    'return_url' => $return_url,
    'cancel_url' => $cancel_url,
    'notify_url' => $notify_url,
    'name_first' => 'John',  // Optional fields for customer info
    'name_last' => 'Doe',
    'email_address' => 'john.doe@example.com'
];

// Generate the payment request URL with query string
$query_string = http_build_query($data);

// Redirect to PayFast
header("Location: $payfast_url?$query_string");
exit;
?>
