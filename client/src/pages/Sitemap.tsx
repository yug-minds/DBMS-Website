import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const SITE_URL = "https://dawnbudsmodelschool.com";

const main = {
  href: "/",
  label: "Home",
  description:
    "Dawn Buds Model School - Quality education in Hyderabad since 2001. Academic programs, facilities, and admissions.",
};

const sitelinks = [
  {
    href: "/about",
    label: "About Us",
    description:
      "Our story, vision, mission, and commitment to holistic education.",
  },
  {
    href: "/academics",
    label: "Academics",
    description:
      "Pre-Primary, Primary, and High School programs. State Board curriculum and ICT-enabled learning.",
  },
  {
    href: "/beyond-academics",
    label: "Beyond Academics",
    description: "Co-curricular activities, sports, and collaborations.",
  },
  {
    href: "/facilities",
    label: "Facilities",
    description: "Campus facilities, labs, library, transport, and safety.",
  },
  {
    href: "/gallery",
    label: "Gallery",
    description: "Photos from events, activities, and school life.",
  },
  {
    href: "/admissions",
    label: "Admissions",
    description: "Admission process, eligibility, and how to apply.",
  },
  {
    href: "/contact",
    label: "Contact",
    description:
      "Address, phone, email, and directions to Begumpet, Hyderabad.",
  },
];

export default function Sitemap() {
  const displayUrl = `${SITE_URL}/`;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Sitemap"
        subtitle="All pages on Dawn Buds Model School"
      />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Main block: Home */}
            <div className="pb-6 mb-6 border-b border-border">
              <Link
                to={main.href}
                className="text-xl font-bold text-primary hover:underline block"
              >
                {main.label}
              </Link>
              <p className="text-sm text-muted-foreground mt-0.5">{displayUrl}</p>
              <p className="text-muted-foreground mt-1">{main.description}</p>
            </div>

            {/* Sitelinks */}
            <ul className="space-y-0">
              {sitelinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-start gap-2 py-3 pl-6 group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-primary group-hover:underline">
                        {item.label}
                      </span>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
