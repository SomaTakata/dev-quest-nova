const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center relative">
      {children}
    </div>
  );
};

export default ClerkLayout;
