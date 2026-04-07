const LoadingScene = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-monis-sand/50 rounded-2xl">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-monis-sand rounded-full" />
      <div className="absolute inset-0 border-4 border-monis-orange border-t-transparent rounded-full animate-spin" />
    </div>
    <p className="text-sm text-monis-charcoal/50 font-medium">
      Building your workspace...
    </p>
  </div>
);

export default LoadingScene;
