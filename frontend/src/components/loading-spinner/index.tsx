


const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-300 border-t-transparent"
      style={{ width: size, height: size }}
    />
  )
}

export default LoadingSpinner