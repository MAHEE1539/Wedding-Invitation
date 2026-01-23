# Wedding Hub - Developer's Customization Guide

## 🎨 How to Customize Your Wedding Hub

### 1. Change Colors & Branding

#### Primary Colors
Edit `src/styles.css`:
```css
:root {
  --accent: #c59b6b;              /* Gold - Change this for accent color */
  --accent-dark: #a77645;         /* Darker gold */
  --accent-gold: linear-gradient(90deg, rgba(197,155,107,0.95), rgba(230,190,140,0.9));
  /* ... other colors */
}
```

**Common Wedding Colors:**
- Gold: `#c59b6b`
- Rose Gold: `#b76e79`
- Silver: `#c0c0c0`
- Burgundy: `#800020`
- Navy: `#001f3f`

#### Text Colors
Also in `src/styles.css`:
```css
.names {
  background: linear-gradient(135deg, #8b0000 0%, #8b0000 100%);
  /* Change #8b0000 to your color */
}
```

#### Quick Color Change Checklist
- [ ] Update `--accent` variable
- [ ] Update `--accent-dark` variable
- [ ] Update `.names` gradient color
- [ ] Update hero title color
- [ ] Check button colors match theme

---

### 2. Modify Invitation Template

#### Edit Hero Section
File: `src/components/Hero.jsx`
```jsx
export default function Hero(){
  return (
    <section className="hero">
      {/* Add/modify content here */}
      <h1 className="names">Ananya & Raj</h1>  {/* Change default names */}
      <p className="headline">We cordially invite you</p>  {/* Edit text */}
      <p className="date">Saturday, December 20, 2025</p>  {/* Default date */}
    </section>
  )
}
```

#### Edit Details Section
File: `src/components/Details.jsx`
- Modify event details cards
- Change section layout
- Update text content

#### Edit Story Section
File: `src/components/Story.jsx`
- Add custom couple story
- Modify story sections
- Update styling

#### Edit Gallery
File: `src/components/Gallery.jsx`
- Change number of photos
- Modify layout
- Update image paths

---

### 3. Add New Form Fields

In `src/pages/GenerateInvitation.jsx`:

**Step 1: Add to state**
```jsx
const [formData, setFormData] = useState({
  // ... existing fields
  phoneNumber: '',        // Add new field
  guestCount: '',         // Add new field
});
```

**Step 2: Add form input**
```jsx
<div className="form-group">
  <label htmlFor="phoneNumber">Phone Number</label>
  <input
    type="tel"
    id="phoneNumber"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleInputChange}
    placeholder="Enter phone number"
  />
</div>
```

**Step 3: Update review page**
File: `src/pages/ReviewInvitation.jsx`
```jsx
<p>Phone: {formData.phoneNumber}</p>
```

---

### 4. Change Logo Text

File: `src/components/Navigation.jsx`:
```jsx
<div className="logo">Your App Name</div>  {/* Change from "Wedding Hub" */}
```

Or make it an image:
```jsx
<img src="/your-logo.png" alt="Logo" className="logo-img" />
```

---

### 5. Modify Button Text & Links

### Navigation Buttons
File: `src/components/Navigation.jsx`
```jsx
<button className="btn-primary nav-btn" onClick={handleContactUs}>
  Contact Us  {/* Change text here */}
</button>
```

### Home Page Buttons
File: `src/pages/Home.jsx`
```jsx
<button className="btn-primary btn-lg" onClick={() => navigate('/template')}>
  View Template  {/* Change text */}
</button>
```

---

### 6. Update Content & Copy

#### Home Page Text
File: `src/pages/Home.jsx`:
```jsx
<h1 className="hero-title">Create Your Perfect Wedding Invitation</h1>
<p className="hero-subtitle">Share your special moment...</p>
```

#### Form Labels
File: `src/pages/GenerateInvitation.jsx`:
```jsx
<label>Bride's Name *</label>
{/* Update all labels here */}
```

---

### 7. Customize CSS for Individual Pages

#### Home Page Styling
Edit `src/pages/pages.css`:
```css
.home-hero {
  padding: 80px 0;  /* Change padding */
  background: linear-gradient(...);  /* Change background */
}

.hero-title {
  font-size: 48px;  /* Change font size */
  color: #8b0000;   /* Change color */
}
```

#### Form Styling
```css
.form-container {
  max-width: 700px;  /* Change form width */
  padding: 40px;     /* Change padding */
}

.form-group input {
  padding: 12px 16px;  /* Change input padding */
  border: 2px solid #e0e0e0;  /* Change border */
}
```

---

### 8. Add New Sections to Invitation

Create new component in `src/components/`:
```jsx
// src/components/CustomSection.jsx
export default function CustomSection(){
  return (
    <section className="custom-section">
      <div className="container">
        <h2>Your Section Title</h2>
        {/* Your content */}
      </div>
    </section>
  )
}
```

Import in `src/pages/TemplatePreview.jsx`:
```jsx
import CustomSection from '../components/CustomSection'

// In JSX:
<CustomSection />
```

---

### 9. Change Form Validation

File: `src/pages/GenerateInvitation.jsx`:
```jsx
const handleReview = () => {
  // Add custom validation
  if(!formData.brideName.trim()){
    alert('Please enter bride name')
    return
  }
  // Add more validations
}
```

---

### 10. Customize Share Links

File: `src/pages/SharePage.jsx`:
```jsx
// Change link format
const invitationLink = `${window.location.origin}/invitation/${coupleId}`
// To: 
const invitationLink = `${window.location.origin}/${coupleId}.html`
```

---

### 11. Add Social Media Links

In Navigation or anywhere:
```jsx
const socialLinks = {
  whatsapp: 'https://wa.me/919999999999',
  facebook: 'https://facebook.com/yourpage',
  instagram: 'https://instagram.com/yourpage'
}

<a href={socialLinks.whatsapp} target="_blank">WhatsApp</a>
```

---

### 12. Change Default Images

### Couple Photo
File: `src/pages/GenerateInvitation.jsx`:
```jsx
couplePhotoPreview: '/assets/couple.jpg',  // Change default
```

### Hero Background
```jsx
heroImagePreview: '/assets/hero.jpg',  // Change default
```

### Garland/Decorations
File: `src/styles.css`:
```css
.garland {
  background-image: url(/assets/garland1.png);  /* Change image */
}
```

---

### 13. Implement Firebase Integration

File: `src/utils/firebase.js` - Already configured!

To use in components:
```jsx
import { storage, db } from '../utils/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

// Upload image
const imageRef = ref(storage, `invitations/${coupleId}/photo.jpg`)
await uploadBytes(imageRef, file)

// Save data
await addDoc(collection(db, 'invitations'), {
  brideName: formData.brideName,
  groomName: formData.groomName,
  // ... other data
})
```

---

### 14. Add Email Notifications

Install package:
```bash
npm install nodemailer  # For backend
```

Create backend endpoint and call from:
`src/pages/ReviewInvitation.jsx`
```jsx
const handleGenerate = async () => {
  // Send email notification
  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      email: formData.email,
      brideName: formData.brideName
    })
  })
}
```

---

### 15. Modify Loading Progress

File: `src/pages/GenerationProgress.jsx`:
```jsx
// Change progress speed
const interval = setInterval(() => {
  setProgress(prev => prev + Math.random() * 30)  // Adjust increment
}, 500)  // Adjust interval

// Change steps
<div className={`step ${progress >= 20 ? 'done' : ''}`}>
  <span>Your custom step</span>
</div>
```

---

## 🔧 Common Customization Tasks

### Task 1: Change Primary Font
```css
/* src/styles.css */
body {
  font-family: 'Your Font', sans-serif;  /* Change here */
}
```

### Task 2: Add Background Pattern
```css
.hero {
  background: 
    repeating-linear-gradient(...),
    url('/pattern.png');
  background-blend-mode: multiply;
}
```

### Task 3: Customize Input Fields
```css
.form-group input {
  background: #f5f5f5;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 0;
}
```

### Task 4: Change Button Style
```css
.btn-primary {
  background: linear-gradient(...);
  border-radius: 50px;  /* Rounded buttons */
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

### Task 5: Add Dark Mode
```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #f0f0f0;
  }
  /* ... other dark styles */
}
```

---

## 📱 Mobile Customization

### Change Mobile Breakpoints
`src/styles.css` and `src/pages/pages.css`:
```css
@media (max-width: 768px) {  /* Change from 900px */
  /* Mobile styles */
}
```

### Change Mobile Stack
```css
.about-grid {
  grid-template-columns: 1fr;  /* Stack vertically */
}
```

---

## 🚀 Performance Tweaks

### Optimize Images
```jsx
<img src={formData.couplePhotoPreview} 
  alt="Couple" 
  loading="lazy"  {/* Add lazy loading */}
/>
```

### Reduce Animation Time
```css
:root {
  --transition-fast: 100ms;  /* Reduce from 180ms */
}
```

### Minify CSS
Build already does this. In production, CSS is optimized automatically.

---

## 🐛 Debugging Tips

### Check Console
```jsx
// Add console logs
console.log('Form data:', formData)
console.log('Navigation:', navigate)
```

### Use React DevTools Browser Extension
- View component hierarchy
- Check props and state
- Trace re-renders

### Check Network Tab
- See API calls
- Check response status
- Debug Firebase errors

---

## 📚 File Quick Reference

| File | Purpose | Edit For |
|------|---------|----------|
| `styles.css` | Global styles | Colors, fonts, animations |
| `pages.css` | Page-specific | Page layouts, sections |
| `App.jsx` | Routing | Routes, pages |
| `Navigation.jsx` | Header/Nav | Logo, nav links |
| `GenerateInvitation.jsx` | Form | Form fields, validation |
| `ReviewInvitation.jsx` | Preview | Display customization |
| `SharePage.jsx` | Share | Link format, share options |
| `components/*.jsx` | Invitation | Template content |

---

## 💡 Pro Tips

1. **Use CSS variables** for easy color changes
2. **Test on mobile** while developing
3. **Keep animations smooth** (<500ms)
4. **Comment your code** for future reference
5. **Use semantic HTML** for accessibility
6. **Optimize images** before uploading
7. **Test forms** with various inputs
8. **Check responsive** on different screens

---

## 🎓 Learning Resources

- MDN CSS Docs: https://developer.mozilla.org/en-US/docs/Web/CSS
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Firebase: https://firebase.google.com/docs
- Vite: https://vitejs.dev

---

## ❓ Common Issues & Solutions

### Issue: Changes not reflecting
**Solution**: Clear browser cache (Ctrl+Shift+R) or restart dev server

### Issue: Images not showing
**Solution**: Check image path in `public/assets/` folder

### Issue: Styles not working
**Solution**: Check CSS specificity or clear cache

### Issue: Firebase not connecting
**Solution**: Verify `.env.local` credentials

---

## 🎯 Next Customization Ideas

1. Add animation on scroll
2. Add testimonials section
3. Add FAQ accordion
4. Add live preview
5. Add theme selector
6. Add language switcher
7. Add guest RSVP tracking
8. Add payment integration
9. Add email notifications
10. Add analytics dashboard

---

**Happy Customizing! 🎨💕**

*Remember: Test all changes on multiple devices before deploying to production.*
