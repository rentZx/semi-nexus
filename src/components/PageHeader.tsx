type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 max-w-4xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold text-cyan-300">{eyebrow}</p> : null}
      <h1 className="text-3xl font-semibold tracking-normal text-slate-50 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
    </header>
  );
}
