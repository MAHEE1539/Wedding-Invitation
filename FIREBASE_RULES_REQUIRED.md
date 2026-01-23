# Firebase Security Rules - CRITICAL

## Current Issue
Images/data likely NOT uploading due to incorrect security rules.

## What You Need to Do (REQUIRED)

### 1. Go to Firebase Console
https://console.firebase.google.com

### 2. Select Project: "weddingbyklippers"

### 3. Set Firestore Rules
Navigate: Firestore Database → Rules

**Replace ALL content with**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{document=**} {
      allow read: if true;
      allow write: if true;
      allow delete: if false;
    }
  }
}
```

**Click "Publish"**

### 4. Set Storage Rules
Navigate: Storage → Rules

**Replace ALL content with**:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /invitations/{allPaths=**} {
      allow read: if true;
      allow write: if true;
      allow delete: if false;
    }
  }
}
```

**Click "Publish"**

## Why This Works
- `allow read: if true` - Anyone can view invitations
- `allow write: if true` - Anyone can create invitations (for demo)
- `allow delete: if false` - Prevent accidental deletion

## After You Set Rules

1. Refresh the app (http://localhost:5174)
2. Try creating invitation again
3. **Open DevTools Console (F12)**
4. Look for logs:
   - 🚀 Starting Firebase upload...
   - ✅ Blobs created...
   - ✅ Couple photo URL...
   - ✅ Firestore document created...
5. Check if it says "✅ ALL FIREBASE OPERATIONS SUCCESSFUL!"

## If Still Getting Errors

Tell me the exact error from console:
- Error Type: `auth/permission-denied` - Rules issue
- Error Type: `storage/unknown` - Storage issue
- Error Type: `not-initialized` - Firebase not loaded

---

## IMPORTANT FOR PRODUCTION

Once testing works, update rules to be secure:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invitations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.createdBy;
    }
  }
}
```

This requires user authentication (add later).

---

## Quick Checklist
- [ ] Go to Firebase Console
- [ ] Select weddingbyklippers project
- [ ] Update Firestore rules to allow read/write: true
- [ ] Update Storage rules to allow read/write: true
- [ ] Publish both
- [ ] Refresh app
- [ ] Try creating invitation
- [ ] Check console for success message
- [ ] Check Firebase console → Firestore → invitations collection for new documents

If you complete these steps and still get errors, paste the console error here.
