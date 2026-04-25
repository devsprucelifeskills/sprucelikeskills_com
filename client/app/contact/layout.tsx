import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Spruce Life Skills',
  description: 'Get in touch with Spruce Life Skills. Contact our offices, centers, and team for inquiries about our courses.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
