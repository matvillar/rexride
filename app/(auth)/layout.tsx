const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex-center min-h-screen w-full bg-purple-300">
      {children}
    </section>
  );
};
export default layout;
