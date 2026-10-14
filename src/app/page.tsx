import { AmbientDecor } from "@/components/AmbientDecor";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MemoryGallery } from "@/components/MemoryGallery";
import { PredictionForm } from "@/components/PredictionForm";
import { QRSection } from "@/components/QRSection";
import { SiteFooter } from "@/components/SiteFooter";
import { WelcomeInvitation } from "@/components/WelcomeInvitation";

export default function HomePage() {
  return (
    <main className="luxury-page min-h-screen">
      <AmbientDecor />
      <div className="fixed top-4 right-4 z-40">
        <LanguageSwitcher />
      </div>
      <WelcomeInvitation />
      <QRSection />
      <JourneyTimeline />
      <PredictionForm />
      <MemoryGallery />
      <SiteFooter />
    </main>
  );
}
