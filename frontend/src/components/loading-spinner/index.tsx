interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 24, fullScreen = true }: LoadingSpinnerProps) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50"
          : "inline-flex items-center justify-center"
      }
      style={!fullScreen ? { width: size, height: size } : undefined}
    >
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-transparent"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;
