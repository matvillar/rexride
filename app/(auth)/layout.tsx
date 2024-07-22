const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen w-full bg-chat">
        {children}
      </section>
    </>
  );
};
export default layout;
