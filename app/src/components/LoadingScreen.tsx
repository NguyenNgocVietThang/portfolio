const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 10000,
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 48,
          height: 48,
          border: '1px solid var(--accent-coral)',
          borderTopColor: 'transparent',
          animation: 'spin 1.5s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
