# QR Code Scanner App

A React Native & Expo app for scanning QR codes with authentication and history storage.

## Features

- User authentication (signup/login with email & password)  
- QR code scanning with camera  
- Scan history saved per user  

## Tech Stack

- React Native  
- Expo  
- Supabase (authentication & database)  
- Expo Camera  

## Supabase Setup

1. Create a free project on [Supabase](https://supabase.com/).  

2. Enable **Email/Password authentication** in the Authentication settings.  

3. Go to the **SQL Editor** in Supabase and run the following SQL code to create the scans table and policies:

```sql
-- Create the table
CREATE TABLE scans (
  id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL,
  text text NOT NULL,
  scanned_at timestamptz DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Policy: users can select their own scans
CREATE POLICY "Users can select their own scans"
ON scans
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: users can insert their own scans
CREATE POLICY "Users can insert their own scans"
ON scans
FOR INSERT
WITH CHECK (auth.uid() = user_id);

    Find your project credentials:

        Project URL: Go to Settings → Data API → Project URL

        Anon Key: Go to Settings → API Keys → Anon Key

    Create secrets.js in the project root:

// secrets.js (gitignored)
export const SUPABASE_URL = 'your-project-url';
export const SUPABASE_ANON_KEY = 'your-anon-key';

Local Installation

    Clone the repository:

git clone https://github.com/your-username/qr-code-scanner.git
cd qr-code-scanner

    Install dependencies:

npm install

    Start the development server:

npx expo start

    Run the app:

    On phone: scan the QR code with Expo Go

    On emulator: press a for Android, i for iOS

Usage

    Sign up with email and password

    Log in

    Scan a QR code

    View the result and check history

License

MIT
