export default function Section({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-20 sm:py-28">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index} — {eyebrow}
      </p>
      <h2 className="mb-12 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {children}
    </section>
  );
}
