import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
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
    title: "SAM'S HARDWARE — BUILD BETTER",
    description: "Professional tools, hardware, and technology. Premium quality tools for professionals and DIY enthusiasts.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
