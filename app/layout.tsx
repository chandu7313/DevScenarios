import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevScenarios | Real-World Production Engineering",
  description: "Browse production engineering scenarios and get AI-powered deep explanations via chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-brand-500/30">
        <div className="fixed inset-0 bg-grid-pattern bg-grid-sm opacity-20 pointer-events-none" />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
