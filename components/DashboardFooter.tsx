const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} tvstanici.net</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
