import './styles/global.css';

export const metadata = {
    title: 'Geetham | Authentic South Indian Cuisine',
    description: 'A symphony of spices, tradition, and love.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}