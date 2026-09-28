import { ContactForm } from "../components/ContactForm";
import { PageLayout } from "../components/PageLayout";
import { TopographicField } from "../components/TopographicField";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Francesco Peluso about software engineering, artificial intelligence, collaborations, and opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return <PageLayout
    eyebrow="~/contact"
    title="contact"
    description={<>Have a project, role, or idea in mind? I&apos;d like to hear about it. Write to <a href="mailto:francesco.peluso04@gmail.com">francesco.peluso04@gmail.com</a> or use the form.</>}
  >
    <div className="contact-composition"><ContactForm /><TopographicField variant="contact" className="contact-field" /></div>
  </PageLayout>;
}
