<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Panel</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
    <h1 class="my-5">Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to our site.</h1>
    <p>
        userid: <?php echo htmlspecialchars($_SESSION["id"]); ?><br>
        username: <?php echo htmlspecialchars($_SESSION["username"]); ?><br>
        account created at: <?php echo htmlspecialchars($_SESSION["created_at"]); ?><br>
        <a href="welcome.php" class="btn">Go Back</a>
    </p>
</body>
</html>