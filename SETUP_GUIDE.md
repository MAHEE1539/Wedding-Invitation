# Wedding Hub - Professional Invitation Generator

A beautiful, modern wedding invitation generation platform where couples can create personalized invitations, generate unique shareable links, and invite guests with elegance.

## Features

✨ **Beautiful Templates** - Professional wedding invitation designs with cultural elegance  
🎨 **Fully Personalized** - Upload photos, add names, dates, and venue details  
🔗 **Unique Links** - Generate personalized URLs for each couple  
📱 **Easy Sharing** - Share via WhatsApp, Facebook, Twitter, or direct link  
☁️ **Cloud Storage** - Secure Firebase backend for images and data  
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
🎭 **Cultural Design** - Celebrates the beauty of Indian wedding traditions  

## Tech Stack

- **Frontend**: React 19, React Router, Vite
- **Backend**: Firebase (Firestore, Storage)
- **Styling**: CSS3 with custom animations
- **Build**: Vite for lightning-fast builds

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project account

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd Wedding-Hub-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Get your Firebase config credentials
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Running the Project

### Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx                 # Landing page
│   ├── TemplatePreview.jsx      # Template preview page
│   ├── GenerateInvitation.jsx   # Form for user details
│   ├── ReviewInvitation.jsx     # Review page before generation
│   ├── GenerationProgress.jsx   # Loading page with progress bar
│   ├── SharePage.jsx            # Share and download page
│   └── pages.css                # All pages styling
├── components/
│   ├── Navigation.jsx           # Reusable navigation component
│   ├── Decorative.jsx          # Garland and flower decorations
│   ├── Header.jsx              # Original template header
│   ├── Hero.jsx                # Hero section
│   ├── Details.jsx             # Event details
│   ├── Story.jsx               # Love story section
│   ├── Gallery.jsx             # Photo gallery
│   ├── RSVP.jsx                # RSVP section
│   ├── Map.jsx                 # Location map
│   └── Notify.jsx              # Notification section
├── utils/
│   └── firebase.js             # Firebase configuration
├── App.jsx                     # Main app with routing
├── styles.css                  # Global styles
└── main.jsx                    # Entry point
```

## User Flow

### 1. Home Page
- Overview of the service
- Feature highlights
- Call-to-action buttons
  - "View Template" → shows sample invitation
  - "Generate Your Invitation" → starts creation flow

### 2. Template Preview
- View the full sample invitation
- Option to start creating own invitation

### 3. Generate Invitation
- Form to enter:
  - Bride and Groom names
  - Wedding date and time
  - Venue details
  - Custom headline
  - Upload couple photo
  - Upload background image

### 4. Review Invitation
- Preview exactly how invitation will look
- Options to:
  - Re-edit details
  - Contact support
  - Generate invitation

### 5. Generation Progress
- Beautiful loading screen with progress bar
- Floating window with blur background
- Shows generation steps:
  - Uploading images
  - Creating invitation
  - Generating link
  - Ready to share

### 6. Share Page
- View generated invitation
- Display unique shareable link (format: `/invitation/bride-name-groom-name`)
- Copy link button
- Share buttons for:
  - WhatsApp
  - Facebook
  - Twitter
- Option to create another invitation

## Customization

### Colors & Styling
Edit `src/styles.css` to customize the accent color:
```css
--accent: #c59b6b;  /* Gold color */
--accent-dark: #a77645;
```

### Template Styling
Modify `src/pages/pages.css` for page-specific styles

### Assets
Place images in `public/assets/`:
- `garland1.png` - Decorative garland
- `couple.jpg` - Default couple photo
- `hero.jpg` - Default background image

## Firebase Setup

### Create Firestore Collection
1. Go to Firebase Console → Firestore Database
2. Create collection: `invitations`
3. Create documents with structure:
```json
{
  "brideName": "Ananya",
  "groomName": "Raj",
  "date": "2025-12-20T17:00:00",
  "venue": "The Grand Palace, Mumbai",
  "headline": "We cordially invite you",
  "couplePhotoURL": "gs://...",
  "heroImageURL": "gs://...",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Setup Storage Rules
In Firebase Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /invitations/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deployment

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Deploy to Netlify
```bash
npm run build
# Connect your repository to Netlify
```

### Deploy to Vercel
```bash
npm run build
# Connect your repository to Vercel
```

## Performance Optimization

- Images are compressed and optimized
- CSS animations use GPU acceleration
- Lazy loading for images
- Code splitting via React Router
- Build optimization with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Responsive

- Fully responsive design
- Touch-friendly buttons
- Optimized for all screen sizes
- Mobile-first approach

## SEO Optimization

- Semantic HTML
- Meta tags in index.html
- Open Graph tags for sharing
- Mobile-friendly design

## Accessibility

- ARIA labels on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance

## Troubleshooting

### Firebase not connecting
- Verify `.env.local` file exists with correct credentials
- Check Firebase project is active
- Ensure Firestore and Storage are enabled

### Images not uploading
- Check Firebase Storage rules
- Verify file size limits
- Check browser console for errors

### Build errors
- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Contributing

To add new features or improvements:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Future Enhancements

- [ ] RSVP tracking dashboard
- [ ] Guest list management
- [ ] Multiple template styles
- [ ] Video messages from guests
- [ ] Gift registry integration
- [ ] Payment gateway integration
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Multilingual support

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email us at: contact@weddinghub.com

## Credits

- Designed with ❤️ for memorable moments
- Built with React and Firebase
- Beautiful UI/UX focused on user experience
- Cultural appreciation for Indian wedding traditions

---

**Version**: 1.0.0  
**Last Updated**: January 2026

Happy planning! 🎉💕
