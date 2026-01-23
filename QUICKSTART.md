# Quick Start Guide - Wedding Hub

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Firebase (Optional for Testing)
For full functionality, create a `.env.local` file:
```bash
cp .env.example .env.local
```

Then add your Firebase credentials. For testing without Firebase, the app will work with demo data.

### Step 3: Start Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🎯 Website Features

### Home Page (`/`)
- Landing page with service overview
- Two main buttons:
  - **View Template** → See sample invitation
  - **Generate Your Invitation** → Start creating

### Template Preview (`/template`)
- Full preview of the sample invitation
- Shows how final invitations will look

### Generate Form (`/generate`)
- Fill in couple details:
  - Bride's name
  - Groom's name
  - Wedding date & time
  - Venue
  - Custom headline (optional)
- Upload photos:
  - Couple photo (round profile picture)
  - Background image

### Review Page (`/review`)
- Preview invitation with your details
- Navigation buttons:
  - **Re-Edit Details** → Go back to form
  - **Contact Us** → Support contact
- **Generate** button to proceed

### Loading Screen (`/progress`)
- Beautiful progress bar (0-100%)
- Floating window with blurred background
- Shows generation steps

### Share Page (`/share/:coupleId`)
- Generated invitation preview
- Unique shareable link
- Social media share buttons:
  - WhatsApp
  - Facebook  
  - Twitter
- Copy link button
- Option to create another

## 📁 File Structure

```
Wedding-Hub-main/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── TemplatePreview.jsx
│   │   ├── GenerateInvitation.jsx
│   │   ├── ReviewInvitation.jsx
│   │   ├── GenerationProgress.jsx
│   │   ├── SharePage.jsx
│   │   └── pages.css (All page styles)
│   ├── components/
│   │   └── Navigation.jsx (Reusable navbar)
│   ├── App.jsx (Router setup)
│   ├── styles.css (Global styles)
│   └── utils/firebase.js
├── public/assets/ (Images)
└── package.json
```

## 🎨 Key Pages and Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/template` | TemplatePreview | View sample |
| `/generate` | GenerateInvitation | Create form |
| `/review` | ReviewInvitation | Preview |
| `/progress` | GenerationProgress | Loading |
| `/share/:coupleId` | SharePage | Share & download |

## 💻 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎨 Styling Notes

- **Colors**: Gold (#c59b6b), Dark red (#8b0000)
- **Font**: Playfair Display (headings), Poppins (body)
- **Theme**: Indian wedding, elegant, cultural
- **Responsive**: Mobile-first design

## 📱 Data Flow

```
Home
  ↓
┌─ Template Preview
└─ Generate Invitation (Form)
    ↓
Review Invitation (Preview)
    ↓
Generation Progress (Loading)
    ↓
Share Page (Success with link)
```

## 🔧 Customization

### Change Accent Color
Edit `src/styles.css`:
```css
--accent: #c59b6b;  /* Your color */
```

### Add Wedding Details
In `GenerateInvitation.jsx`, add more form fields to `formData` state.

### Modify Template
Edit components in `src/components/`:
- `Hero.jsx` - Main section
- `Details.jsx` - Event details
- `Story.jsx` - Love story
- `Gallery.jsx` - Photos

## ⚠️ Important Notes

1. **Firebase Setup**: Optional for development, required for production
2. **Image Upload**: Currently stored in memory (sessionStorage). Implement Firebase Storage for persistence
3. **Data Persistence**: Use Firestore to save invitations database
4. **Unique Links**: Currently format is `/invitation/{bride}-{groom}`. Add persistence layer for real URLs

## 🚀 Deployment Checklist

- [ ] Firebase project created
- [ ] Environment variables set
- [ ] Images optimized
- [ ] Build tested: `npm run build`
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] All routes working
- [ ] Forms validating

## 📞 Need Help?

Check these files:
- `SETUP_GUIDE.md` - Complete setup instructions
- `README.md` - Project overview
- Console (F12) - Error messages
- Network tab - API calls

## 🎯 Next Steps

1. Customize colors and fonts
2. Add your Firebase credentials
3. Implement database storage
4. Upload to Firebase Hosting
5. Set up custom domain
6. Monitor analytics

---

**Happy Building! 🎉💕**
