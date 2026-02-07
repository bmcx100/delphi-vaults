export default function VaultCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-8 animate-pulse">
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted"></div>
          <div>
            <div className="h-7 w-32 bg-muted rounded mb-2"></div>
            <div className="h-4 w-16 bg-muted rounded"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="h-4 w-12 bg-muted rounded mb-2"></div>
          <div className="h-8 w-20 bg-muted rounded"></div>
        </div>
        <div>
          <div className="h-4 w-24 bg-muted rounded mb-2"></div>
          <div className="h-6 w-16 bg-muted rounded"></div>
        </div>
      </div>

      <div className="h-12 bg-muted rounded"></div>
    </div>
  );
}
