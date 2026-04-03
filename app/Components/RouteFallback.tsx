import ThemeLoader from "./ThemeLoader";

type RouteFallbackProps = {
  label?: string;
};

export default function RouteFallback({
  label = "Preparing your next conversation...",
}: RouteFallbackProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_60%),linear-gradient(to_bottom_right,_#18181b,_#09090b)] text-white">
      <ThemeLoader label={label} />
    </div>
  );
}
