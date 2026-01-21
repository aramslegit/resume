import profilePhoto from "@/assets/profile-photo.jpeg";
import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const HeroSection = () => {
  return (
    <section className="relative pb-12 md:pb-20">
      {/* Header with theme toggle and download */}
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a href="/Aram_Mamian_Resume.pdf" download>
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </Button>
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Profile Photo */}
        <div className="animate-fade-in">
          <div className="relative">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={profilePhoto}
                alt="Aram Mamian"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <span className="text-accent-foreground text-sm">✓</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 animate-slide-up">
          <div className="accent-bar" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-3">
            Aram Mamian
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
            Hybrid IT Professional
          </p>
          <p className="text-base md:text-lg text-secondary-foreground leading-relaxed max-w-2xl mb-8">
            Full-stack development expertise blended with strategic project leadership and business analysis. 
            Equally comfortable architecting applications, conducting functional analysis, or steering 
            multi-team projects from concept to launch. Founded <strong>Stratae</strong> in 2020—a software 
            development, project management, and delivery company—where I lead a dynamic team of developers 
            and analysts on digital product initiatives.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
            <a
              href="mailto:aram@stratae.io"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              aram@stratae.io
            </a>
            <a
              href="tel:+32473770711"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              +32 473 77 07 11
            </a>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Mechelen, Belgium
            </span>
            <a
              href="https://linkedin.com/in/arammamian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
