<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body>
    <h1>Hello!</h1>
    <p>You are receiving this email because we received a password reset request for your account.</p>
    <p><strong>Reset Password</strong></p>
    <p>This password reset link will expire in 60 minutes.</p>
    <p>If you did not request a password reset, no further action is required.</p>
    <p>Regards,<br>Laravel</p>
    <input type="text" value="{{$token}}">
    <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
    <p><a href="{{ $url }}">{{ $url }}</a></p>
</body>
</html>
