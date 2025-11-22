# Email Setup Guide - DPCON Appointment Booking

## Issue
Emails are not being sent to users and admin when appointments are booked in the Next.js frontend, but they work in the React backup project.

## Root Cause
The backend already has the correct email configuration in `.env` file:
```
EMAIL_USER=dpconindia@gmail.com
EMAIL_PASSWORD=lndsqedtglrhyynv
```

## Solution Steps

### 1. Verify Backend Email Configuration
The backend at `C:\Users\ADMIN\Documents\DPConIndiaBackend\.env` already contains:
- ✅ `EMAIL_USER=dpconindia@gmail.com`
- ✅ `EMAIL_PASSWORD=lndsqedtglrhyynv`

### 2. Test Email Service
Run the test script to verify email configuration:
```bash
cd C:\Users\ADMIN\Documents\DPConIndiaBackend
node test-email.js
```

### 3. Restart Backend Server
After verifying the `.env` file, restart your backend server:
```bash
cd C:\Users\ADMIN\Documents\DPConIndiaBackend
npm start
# or
node server.js
```

### 4. Check Gmail Settings
If emails still don't send, verify Gmail settings:

1. **App Password**: The password `lndsqedtglrhyynv` is a Gmail App Password (16 characters)
2. **2-Factor Authentication**: Must be enabled on dpconindia@gmail.com
3. **Less Secure Apps**: Not needed when using App Password

### 5. Verify Email Flow
When an appointment is booked via `createAppointment` endpoint:
1. Backend receives appointment data
2. Saves appointment to database
3. Calls `sendAppointmentEmails()` function
4. Sends 2 emails:
   - Confirmation email to user
   - Notification email to admin (dpconindia@gmail.com)

### 6. Check Backend Logs
Monitor backend console for email logs:
- `📧 Sending appointment emails to: [email]`
- `✅ Appointment emails sent successfully`
- `❌ Failed to send appointment emails: [error]`

## Common Issues & Fixes

### Issue: "Invalid login credentials"
**Fix**: Regenerate Gmail App Password
1. Go to Google Account → Security → 2-Step Verification → App passwords
2. Generate new password for "Mail"
3. Update `EMAIL_PASSWORD` in `.env`
4. Restart backend

### Issue: "Connection timeout"
**Fix**: Check firewall/network settings
- Ensure port 587 is not blocked
- Try port 465 with `secure: true`

### Issue: Emails not received
**Fix**: Check spam folder and email logs
- Check user's spam/junk folder
- Verify email address is correct
- Check backend console logs

## Email Service Code Location
- Email service: `C:\Users\ADMIN\Documents\DPConIndiaBackend\services\email.js`
- Appointment controller: `C:\Users\ADMIN\Documents\DPConIndiaBackend\controllers\appointmentController.js`
- Function: `sendAppointmentEmails()`

## Testing
1. Book an appointment from frontend
2. Check backend console for email logs
3. Verify user receives confirmation email
4. Verify admin receives notification at dpconindia@gmail.com
