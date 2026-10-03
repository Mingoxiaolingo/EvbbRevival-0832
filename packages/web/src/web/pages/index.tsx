import { Nav } from "../components/site/nav";
import { Hero } from "../components/site/hero";
import { Live } from "../components/site/live";
import { Features } from "../components/site/features";
import { Join } from "../components/site/join";
import { Commands } from "../components/site/commands";
import { Rules } from "../components/site/rules";
import { Staff } from "../components/site/staff";
import { Faq } from "../components/site/faq";
import { Footer } from "../components/site/footer";
import { useReveal } from "../hooks/use-reveal";

function Index() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-ink">
      <Nav />
      <main>
        <Hero />
        <Live />
        <Features />
        <Join />
        <Commands />
        <Rules />
        <Staff />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default Index;
