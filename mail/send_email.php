<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["Name"];
    $email = $_POST["Email"];
    $phone = $_POST["Phone"];
    $date = $_POST["Date"];
    $subject = $_POST["subject"];
    $message = $_POST["form_message"];

    // Set recipient email address
    $to = "smiter911@gmail.com";

    // Compose email message
    $subject = "New Contact Form Submission - $subject";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Date: $date\n";
    $body .= "Subject: $subject\n";
    $body .= "Message:\n$message";

    // Set additional headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send email
    mail($to, $subject, $body, $headers);

    // You can add additional logic or redirect the user after sending the email
    echo "Email sent successfully!";
} else {
    // Handle invalid requests
    echo "Invalid request";
}
?>
