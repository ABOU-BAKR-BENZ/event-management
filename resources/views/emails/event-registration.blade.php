<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Event Registration Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
        }

        .event-details {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Event Registration Confirmation</h2>
        <p>Dear <strong>{{ $formData['user_name'] }}</strong>,</p>

        <p>We are pleased to confirm your registration for the event:</p>

        <div class="event-details">
            <p><strong>Event Name:</strong> {{ $formData['event_name'] }}</p>
            <p><strong>Date & Time:</strong> {{ $formData['event_date'] }}</p>
            <p><strong>Duration:</strong> {{ $formData['event_duration'] }} minutes</p>
            <p><strong>Organizer:</strong> {{ $formData['sender_full_name'] }}</p>
        </div>

        <p>We look forward to having you join us! If you have any questions, feel free to contact us.</p>

        <p><a href="#" class="btn">View Event Details</a></p>

        <div class="footer">
            <p>&copy; {{ date('Y') }} Event Management. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
