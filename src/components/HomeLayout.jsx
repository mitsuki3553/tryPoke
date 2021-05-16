export const HomeLayout = ({ children }) => {
  return (
    <div className="bg-gray-500">
      <div className="max-w-lg mx-auto flex flex-col bg-yellow-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};
