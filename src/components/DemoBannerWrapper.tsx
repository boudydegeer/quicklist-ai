import { isDemoMode } from "@/lib/demo";
import DemoBanner from "./DemoBanner";

export default function DemoBannerWrapper() {
  if (!isDemoMode()) return null;
  return <DemoBanner />;
}
