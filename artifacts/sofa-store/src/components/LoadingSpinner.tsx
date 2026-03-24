export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[500] bg-black/60 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
    </div>
  );
}
