# OSP - Orphan Sponsorship Program

A modern, multi-page React application for the Orphan Sponsorship Program (OSP), a charity-based organization dedicated to raising money for orphans around the world and helping Muslim communities.

## Features

### Pages
- **Home** - Welcome page with mission statement and overview of services
- **About** - Organization story, values, and impact statistics
- **Programs** - Detailed information about various support programs
- **Donate** - Interactive donation form with multiple giving options
- **Events** - Upcoming and past events with volunteer opportunities
- **Gallery** - Visual showcase of the organization's work and impact
- **Contact** - Contact information and message form

### Key Features
- 🎨 Modern, responsive design
- 📱 Mobile-friendly navigation
- 💚 Islamic values-centered content
- 🌍 Focus on global orphan support
- 🤝 Multiple ways to get involved (donate, volunteer, sponsor)
- 📊 Impact statistics and testimonials
- 🎯 Clear calls-to-action throughout

## Tech Stack

- **React** 18.2.0 - UI library
- **React Router DOM** 6.20.0 - Client-side routing
- **Vite** 5.0.8 - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
OSPClubFairGame/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Card.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Programs.jsx
│   │   ├── Donate.jsx
│   │   ├── Events.jsx
│   │   ├── Contact.jsx
│   │   └── Gallery.jsx
│   ├── App.jsx         # Main app component with routes
│   ├── App.css         # Component-specific styles
│   ├── index.css       # Global styles
│   ├── pages.css       # Page-specific styles
│   └── main.jsx        # App entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Customization

### Colors
The application uses CSS variables for easy theming. Edit the colors in `src/index.css`:

```css
:root {
  --primary-color: #10a37f;
  --primary-dark: #0d8c6a;
  --secondary-color: #2d6a4f;
  --accent-color: #52b788;
  /* ... more variables */
}
```

### Content
Update the content in each page component located in `src/pages/` to match your organization's specific information.

### Navigation
Modify navigation links in `src/components/Navbar.jsx` to add or remove pages.

## Features to Implement

This application provides a solid foundation. Consider adding:

- Backend integration for donation processing
- Database for storing donor information
- Email service for contact form submissions
- Admin dashboard for content management
- Blog/News section
- Multi-language support
- Photo/video gallery with actual media
- Newsletter subscription
- Social media feed integration
- Live chat support

## Contributing

This is a template application. Feel free to customize it for your organization's needs.

## License

This project is open source and available for use by charitable organizations.

## Support

For questions or support, please contact the development team.

---

Built with ❤️ for OSP - Orphan Sponsorship Program
