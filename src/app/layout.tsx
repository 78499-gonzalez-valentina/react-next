"use client";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <title>TechSpot</title>
      </head>
      
      <body
      >
        
        {children}
      </body>
    </html>
  );
}
