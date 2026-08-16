import Navbar from "@/modules/navbar/components/Navbar";
import Hero from "@/modules/hero/components/Hero";
import Profile from "@/modules/profile/components/Profile";
import Skills from "@/modules/skills/components/Skills";
import Experience from "@/modules/experience/components/Experience";
import Education from "@/modules/education/components/Education";
import Contact from "@/modules/contact/components/Contact";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getDictionary } from "@/i18n/dictionaries/get-dictionary";

interface HomePageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;
  const dict = await getDictionary(lng as "es" | "en");

  return (
    <main className="bg-space-gradient  flex flex-col min-h-screen">
      {/* Navbar arriba de todo */}
      <Navbar lng={lng} data={dict.navbar} />
      
      <div className="container mx-auto px-4 space-y-20 py-10">
        {/* Hero de presentación (sin animación, ya visible al cargar) */}
        <section id="hero">
          <Hero dict={dict.hero} />
        </section>

        {/* Profile debajo del Hero */}
        <RevealOnScroll>
          <section id="profile">
            <Profile data={dict.profile} />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="education">
            <Education data={dict.education} />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="experience">
            <Experience data={dict.experience} />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="skills">
            <Skills data={dict.skills} />
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section id="contact">
            <Contact data={dict.contact} />
          </section>
        </RevealOnScroll>
      </div>
    </main>
  );
}