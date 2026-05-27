"use client";

import dynamic from 'next/dynamic';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
const CompanyMap = dynamic(
  () => import('../components/CompanyMap'),
  { ssr: false }
);

export default function MapPage() {
  return (
    <>
    <BackButton/>
    <CompanyMap companyName="Geetham" height="100vh" />
    <Footer/>
    </>
  );
}