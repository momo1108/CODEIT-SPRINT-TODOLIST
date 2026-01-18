interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <main className="flex-1 overflow-y-auto flex">{children}</main>
    </div>
  );
}
