<?php
// PayFast Notification URL - Receive the payment notification sent by PayFast
$notification = file_get_contents('php://input');

// Process the notification (Verify the transaction, update order status, etc.)
file_put_contents('payment_log.txt', $notification, FILE_APPEND);

// Return a success response to PayFast
echo "OK";
?>
