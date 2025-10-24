export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Carregando...</h2>

        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute h-3 bg-fuchsia-600 rounded-full animate-progress" />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            left: -40%;
            width: 40%;
          }
          50% {
            left: 20%;
            width: 60%;
          }
          100% {
            left: 100%;
            width: 80%;
          }
        }

        .animate-progress {
          animation: progress 0.8s infinite linear;
        }
      `}</style>
    </div>
  );
}
