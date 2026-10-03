import Hero from "@/components/home/Hero"; // ← without /home/
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyUsPreview from "@/components/home/WhyUsPreview";
 import FoundersSection from "@/components/home/FoundersSection";
import { Helmet } from "react-helmet-async";


<Helmet>
  <title>LKSC & Associates LLP | Corporate & Compliance Experts</title>

  <meta
    name="description"
    content="LKSC & Associates LLP offers company secretarial, corporate law, audit, and compliance services across India."
  />

  <link rel="canonical" href="https://yourdomain.com/" />

  <meta property="og:title" content="LKSC & Associates LLP" />
  <meta property="og:description" content="Corporate, audit, and compliance services across India." />
  <meta property="og:url" content="https://yourdomain.com/" />
  <meta property="og:image" content="https://yourdomain.com/preview.png" />

  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
const Home = () => (
  <>
    <Hero />
    <AboutPreview />
    <WhyUsPreview />
     <FoundersSection /> 
    <ServicesPreview />
    {/* <WhyUs /> */}
    {/* <ContactCTA /> */}
  </>
);

export default Home;