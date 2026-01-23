# Browser Extension Blocking Firebase - SOLUTION

## Problem
`net::ERR_BLOCKED_BY_CLIENT` on Firestore POST request

**This means**: Your browser extension is blocking the request BEFORE it reaches Firebase

## How to Fix

### Option 1: Disable Extension for localhost (FASTEST)
1. **Open DevTools** (F12)
2. **Find which extension is blocking**:
   - Go to Console tab
   - Look for messages from extensions
   - Or click extension icons in toolbar
3. **Disable for localhost**:
   - Click the blocking extension icon
   - Select "Don't run on localhost"
   - Or "Disable for this site"
4. **Refresh page** (Ctrl+R or Cmd+R)
5. **Try creating invitation again**

### Option 2: Use Incognito/Private Mode (EASIEST FOR TESTING)
Extensions are disabled by default in incognito mode:

**Chrome**:
1. Press Ctrl+Shift+N
2. Go to http://localhost:5174
3. Create invitation (no extensions blocking)
4. Watch console logs

**Firefox**:
1. Press Ctrl+Shift+P
2. Go to http://localhost:5174
3. Create invitation

**Safari**:
1. File → New Private Window
2. Go to http://localhost:5174

### Option 3: Identify & Whitelist Extension
1. **Find the blocker**:
   - Open DevTools (F12)
   - Go to Console
   - Look for extension warnings
   - Common culprits:
     - **uBlock Origin** (most common)
     - **Adblock Plus**
     - **Privacy Badger**
     - **DuckDuckGo extension**
     - **Ghostery**
     - **1Blocker**

2. **For uBlock Origin**:
   - Click uBlock icon → Settings (⚙️)
   - Find "My Filters" or "My Rules"
   - Add exception: `||localhost`
   - Or add: `||firestore.googleapis.com`

3. **For Privacy Badger**:
   - Click icon
   - Look for blocked domains
   - Click to allow

## Test Steps

### Step 1: Disable/Whitelist Extension

**uBlock Origin specific**:
```
1. Click uBlock icon
2. Click the settings ⚙️ icon
3. Go to "My filters" or "My rules" tab
4. Add this line:
   localhost:5174 script allow
5. Or: firestore.googleapis.com script allow
```

### Step 2: Refresh Browser
```
Ctrl+R (Windows/Linux)
Cmd+R (Mac)
Or Ctrl+Shift+R for hard refresh
```

### Step 3: Test Upload
1. Go to http://localhost:5174
2. Click "Create Invitation"
3. Fill out form
4. Click "Generate"
5. **Open DevTools (F12) → Console**
6. Look for logs:
   ```
   🚀 Starting Firebase upload...
   📸 Converting images to blobs...
   ✅ Blobs created: [size] [size]
   📤 Uploading couple photo to: invitations/[timestamp]/couple-photo.jpg
   ✅ Couple photo URL: https://...
   📤 Uploading hero image to: invitations/[timestamp]/hero-image.jpg
   ✅ Hero image URL: https://...
   💾 Saving to Firestore...
   ✅ Firestore document created: [docId]
   ✅ ALL FIREBASE OPERATIONS SUCCESSFUL!
   ```

If you see these logs → **SUCCESS!** 🎉

## Verify It's Working

After successful upload:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select weddingbyklippers project
3. Go to Firestore Database
4. Should see **"invitations" collection** with new documents
5. Go to Storage
6. Should see **"invitations" folder** with uploaded images

## Common Extension Issues

| Extension | How to Whitelist |
|-----------|------------------|
| **uBlock Origin** | Click icon → ⚙️ Settings → My filters → Add `localhost:5174` |
| **Adblock Plus** | Click icon → Options → Whitelist → Add `localhost:5174` |
| **Privacy Badger** | Click icon → Find `firestore.googleapis.com` → Allow |
| **DuckDuckGo** | Click icon → Privacy Protection → Allow localhost |
| **Ghostery** | Click icon → Trust Site |
| **1Blocker** | Settings → Exceptions → Add `localhost:5174` |

## If Still Blocked

1. Check **ALL extensions** - might be multiple blocking
2. Try **disabling ALL extensions** temporarily
3. Use **incognito mode** (safest for testing)
4. Try **different browser** (Chrome, Firefox, etc.)

## Verify Extension isn't Blocking

Run in console:
```javascript
fetch('https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
})
.then(r => console.log('✅ Firestore accessible:', r.status))
.catch(e => console.error('❌ Blocked:', e.message))
```

Should show:
- ✅ `Firestore accessible: 200` → Working!
- ❌ `Blocked: Failed to fetch` → Extension blocking

## For Production

Once deployed to real domain, users won't have extension blocks because:
- Extensions don't block most legitimate websites
- User has control over their own extensions
- Firestore API is on `firestore.googleapis.com` (trusted by most)

## Quick Fix (5 minutes)

**Fastest solution**:
1. Open **Incognito Window** (Ctrl+Shift+N)
2. Go to http://localhost:5174
3. Create invitation
4. Test! ✅

**If works in Incognito**: Your extension is the issue → whitelist it for localhost

**If fails in Incognito**: Different problem → file error message here
