// The OpenPlan AI mark, painted in the current text colour (so it follows light/dark mode).
export default function OpenPlanLogo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block bg-current ${className}`}
      style={{
        maskImage: "url(/brand/openplan-logo.svg)",
        WebkitMaskImage: "url(/brand/openplan-logo.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
