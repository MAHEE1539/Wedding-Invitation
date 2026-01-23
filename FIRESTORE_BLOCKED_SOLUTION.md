# Firebase Firestore Blocked - Solution

## Problem
**Error**: `net::ERR_BLOCKED_BY_CLIENT`  
**Cause**: Browser extension (ad blocker, privacy tool, etc.) is blocking Firestore API requests

## Symptoms
- Invitations won't save to Firestore
- Error shows "your-project" (default) instead of "weddingbyklippers"
- Actually wait - if config loaded, it should show correct project ID
- Firestore requests being terminated

## Solutions

### Solution 1: Disable Ad Blocker/Privacy Extension (Temporary Testing)
1. **Identify the blocker**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for extension warnings
   - Common blockers: uBlock Origin, Adblock Plus, Privacy Badger, DuckDuckGo Extension

2. **Temporarily disable**:
   - Click extension icon
   - Disable for localhost:5174
   - Refresh page
   - Try generating invitation

3. **Test**:
   - Open DevTools → Network tab
   - Generate invitation
   - Check if Firestore requests complete (should see in Network tab)

### Solution 2: Add Firestore to Extension Whitelist (Permanent)
Many extensions allow whitelisting:

**uBlock Origin**:
1. Click uBlock icon
2. Click settings (⚙️)
3. Whitelist: `localhost:5174`
4. Or disable for weddingbyklippers.firebaseapp.com

**Privacy Badger**:
1. Click Privacy Badger icon
2. View for localhost
3. Allow Firestore connections

**AdBlock Plus**:
1. Add to whitelist: `localhost:5174`

### Solution 3: Check CORS Headers (If Using Proxy)
If you're using a proxy or VPN:
1. Check browser DevTools → Network tab
2. Look for Firestore requests
3. Check if `Access-Control-Allow-Origin` headers present

### Solution 4: Use Different Browser
For testing, try:
- Chrome Incognito (extensions disabled by default)
- Firefox Private Window
- Edge (without extensions)

## Testing Steps

### Step 1: Disable Extensions
1. Open DevTools (F12)
2. Disable all extensions
3. Refresh page (Ctrl+R)

### Step 2: Create Invitation
1. Click "Create Invitation"
2. Fill out form
3. Click "Generate"
4. Wait for progress bar

### Step 3: Check Console
```
Look for:
✅ Firebase config loaded correctly
✅ Firestore requests completed
✅ Invitation saved (document ID received)
```

### Step 4: If Still Blocked
1. Check Network tab (F12 → Network)
2. Look for requests to `firestore.googleapis.com`
3. Click request
4. Check response status (should be 200, not blocked)

## Verify Firebase is Actually Connected

Add this to your browser console:
```javascript
import { db } from './src/utils/firebase.js'
console.log('Firebase DB:', db)
```

Should show Firestore instance, not undefined.

## Common Extension Conflicts

| Extension | Solution |
|-----------|----------|
| **uBlock Origin** | Whitelist localhost or disable for site |
| **Adblock Plus** | Add to whitelist |
| **Privacy Badger** | Allow Firestore domain |
| **DuckDuckGo** | Disable tracker blocking for localhost |
| **Ghostery** | Disable for localhost |
| **1Blocker** | Whitelist Firestore API |

## Firebase Rules Check

Also verify Firebase rules allow reads:

**Firestore Rules**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Check in [Firebase Console](https://console.firebase.google.com) → weddingbyklippers project → Firestore → Rules

## Quick Debug

Run in browser console:
```javascript
// Copy and paste this:
fetch('https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => {
  console.log('✅ Firestore accessible:', r.status)
})
.catch(e => {
  console.error('❌ Firestore blocked:', e.message)
})
```

Should show either:
- ✅ `Firestore accessible: 200` → Working!
- ❌ `Firestore blocked: Failed to fetch` → Extension blocking

## Recommended Approach

1. **For Development**: Temporarily disable extensions for localhost
2. **For Production**: Deploy to real domain (no extension blocks real domains as easily)
3. **For Users**: Your website won't have this issue - users won't need to disable extensions

## After Fixing

1. Remove the debug code from Home.jsx
2. Delete debugConfig.js
3. Test invitation creation end-to-end
4. Verify Firestore console shows new documents

## If Still Having Issues

Check:
1. Browser console for JavaScript errors (F12)
2. Network tab for failed requests
3. Firebase console for security rules
4. Firestore data actually being created

---

**Most likely solution**: Disable your ad blocker for localhost:5174, then test again.
