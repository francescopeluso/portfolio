import Link from "next/link";
import { PageLayout } from "./components/PageLayout";

export default function NotFound() {
  return <PageLayout eyebrow="404" title="not found" description="This page isn't here.">
    <p><Link href="/">Return to the homepage →</Link></p>
  </PageLayout>;
}
