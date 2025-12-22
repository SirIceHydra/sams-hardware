import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { departmentName: string } }): Promise<Metadata> {
  const departmentName = decodeURIComponent(params.departmentName).replace(/-/g, ' ');
  const title = `${departmentName.charAt(0).toUpperCase() + departmentName.slice(1)} | Hardware Store Norwood, Johannesburg`;
  
  return {
    title,
    description: `Shop ${departmentName} at Sam's Hardware in Norwood, Johannesburg. Quality products, expert advice, and competitive prices. Visit us at 49b Grant Avenue, Norwood.`,
    keywords: [
      `${departmentName} Norwood`,
      `${departmentName} Johannesburg`,
      `hardware store ${departmentName} Norwood`,
      `buy ${departmentName} Johannesburg`,
    ],
    openGraph: {
      title: `${title} | Sam's Hardware`,
      description: `Shop ${departmentName} at Sam's Hardware in Norwood, Johannesburg.`,
      url: `/department/${params.departmentName}`,
      type: 'website',
    },
    alternates: {
      canonical: `/department/${params.departmentName}`,
    },
  };
}

