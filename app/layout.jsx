import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: '--font-jetbrains',
});

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://samshardware.co.za'),
    title: {
        default: "Sam's Hardware | Premier Hardware Store in Norwood, Johannesburg",
        template: "%s | Sam's Hardware"
    },
    description: "Sam's Hardware is the premier hardware store in Norwood, Johannesburg. We offer professional tools, building materials, electrical supplies, plumbing, paint, and more. Visit us at 49b Grant Avenue, Norwood. Open Mon-Sat 8am-8pm, Sun 8am-3pm.",
    keywords: [
        "hardware store Norwood",
        "hardware store Johannesburg",
        "hardware store South Africa",
        "building materials Norwood",
        "tools Johannesburg",
        "electrical supplies Norwood",
        "plumbing supplies Johannesburg",
        "paint store Norwood",
        "power tools Johannesburg",
        "hand tools Norwood",
        "DIY supplies Johannesburg",
        "construction materials Norwood",
        "hardware shop Johannesburg",
        "Norwood hardware",
        "Johannesburg hardware store"
    ],
    authors: [{ name: "Sam's Hardware" }],
    creator: "Sam's Hardware",
    publisher: "Sam's Hardware",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_ZA',
        url: '/',
        siteName: "Sam's Hardware",
        title: "Sam's Hardware | Premier Hardware Store in Norwood, Johannesburg",
        description: "Sam's Hardware is the premier hardware store in Norwood, Johannesburg. We offer professional tools, building materials, electrical supplies, plumbing, paint, and more.",
        images: [
            {
                url: '/Images/carausel_header/handtools.jpeg',
                width: 1200,
                height: 630,
                alt: "Sam's Hardware - Premier Hardware Store in Norwood, Johannesburg",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Sam's Hardware | Premier Hardware Store in Norwood, Johannesburg",
        description: "Sam's Hardware is the premier hardware store in Norwood, Johannesburg. We offer professional tools, building materials, electrical supplies, plumbing, paint, and more.",
        images: ['/Images/carausel_header/handtools.jpeg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', type: 'image/x-icon' },
        ],
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    manifest: '/manifest.json',
    alternates: {
        canonical: '/',
    },
    other: {
        'theme-color': '#1A1918',
        'geo.region': 'ZA-GP',
        'geo.placename': 'Norwood, Johannesburg',
        'geo.position': '-26.1750;28.0820',
        'ICBM': '-26.1750, 28.0820',
    },
    verification: {
        // Add Google Search Console verification when available
        // google: 'your-google-verification-code',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en-ZA" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
            <body className={`${spaceGrotesk.className} antialiased`}>
                <StoreProvider>
                    <Toaster 
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#1A1918',
                                color: '#FAFAFA',
                                borderRadius: '0',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                border: '2px solid #3D3B38',
                                padding: '16px 20px',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            },
                            success: {
                                style: {
                                    borderColor: '#f8cc28',
                                    borderLeft: '4px solid #f8cc28',
                                },
                                iconTheme: {
                                    primary: '#f8cc28',
                                    secondary: '#1A1918',
                                },
                            },
                            error: {
                                style: {
                                    borderColor: '#E53935',
                                    borderLeft: '4px solid #E53935',
                                },
                                iconTheme: {
                                    primary: '#E53935',
                                    secondary: '#1A1918',
                                },
                            },
                        }}
                    />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
