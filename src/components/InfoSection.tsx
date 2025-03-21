
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import { useLanguage } from "@/contexts/LanguageContext";

interface InfoSectionProps {
  id: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
  titleKey?: string;
  descriptionKey?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  id,
  title,
  description,
  icon,
  children,
  className,
  inverse = false,
  titleKey,
  descriptionKey,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("translate-y-8");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const displayTitle = titleKey ? t(titleKey) : title;
  const displayDescription = descriptionKey ? t(descriptionKey) : description;

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "section-container opacity-0 translate-y-8 transition-all duration-700",
        inverse ? "bg-primary/5" : "",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col items-center text-center">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          <div className="info-chip mb-3">
            {icon}
            <span>{displayTitle}</span>
          </div>
          <AnimatedText
            element="h2"
            text={displayTitle || ""}
            className="text-3xl md:text-4xl mb-4"
          />
          {displayDescription && (
            <AnimatedText
              element="p"
              text={displayDescription}
              className="text-lg text-gray-600"
              delay={300}
            />
          )}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
};

export default InfoSection;
