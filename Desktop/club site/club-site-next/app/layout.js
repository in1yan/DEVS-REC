import "./globals.css";

export const metadata = {
  title: 'DEVS - Tech Community',
  description: 'Code-coffee-repeat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700;900&family=La+Belle+Aurore&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.9/dist/lenis.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
