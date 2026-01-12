# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project
4. Enable Google Analytics (optional but recommended)

## Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Give your app a nickname (e.g., "OSP Club Fair Game")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object shown

## Step 3: Configure Your App

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values with your actual Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

3. Update `src/firebase/config.js` to use environment variables (already configured)

## Step 4: Enable Firebase Services

### Firestore Database
1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" for development (or production mode with rules)
4. Select a location for your database
5. Click "Enable"

### Authentication (Optional)
1. Go to **Build > Authentication**
2. Click "Get started"
3. Enable the sign-in methods you want (Email/Password, Google, etc.)

### Analytics (Already included)
- Analytics is automatically initialized if you enabled it during project creation

## Step 5: Set Up Firestore Security Rules

In Firestore Database > Rules, update your rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Game statistics - read-only for all, write for authenticated users
    match /gameStats/{statId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User data - only readable/writable by the user
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Donations/Contact forms - write-only for all
    match /contacts/{contactId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## Step 6: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any Firebase errors
3. Your Firebase connection should now be active!

## Available Firebase Services

- **Firestore Database**: Store game results, user data, donation info
- **Authentication**: User sign-in (if needed)
- **Analytics**: Track user interactions and game completion rates
- **Hosting**: Deploy your app (optional)

## Example Usage

### Save Game Result to Firestore
```javascript
import { db } from './firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const saveGameResult = async (choices, consequences) => {
  try {
    await addDoc(collection(db, 'gameStats'), {
      choices,
      consequences,
      totalScore: Object.values(consequences).reduce((a, b) => a + b, 0),
      timestamp: new Date()
    })
    console.log('Game result saved!')
  } catch (error) {
    console.error('Error saving game result:', error)
  }
}
```

### Track with Analytics
```javascript
import { analytics } from './firebase/config'
import { logEvent } from 'firebase/analytics'

// Log when game is completed
logEvent(analytics, 'game_completed', {
  total_consequences: totalConsequences,
  choices_made: choices.length
})
```

## Troubleshooting

- **"Firebase: Error (auth/api-key-not-valid)"**: Check your API key in `.env`
- **"Firebase: Firebase App named '[DEFAULT]' already exists"**: Firebase is trying to initialize twice
- **Firestore permission errors**: Update your security rules in Firebase Console

## Next Steps

- Set up Firestore collections for storing game statistics
- Add authentication if you want user accounts
- Deploy to Firebase Hosting for production
- Set up Cloud Functions for backend logic (if needed)
