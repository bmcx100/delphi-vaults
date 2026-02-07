export default function Footer() {
  return (
    <footer className="mt-24 relative overflow-hidden" style={{ backgroundColor: '#3d3d3d' }}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10 opacity-50" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center mb-8">
          <img
            src="/images/Delphi Logo Full.png"
            alt="Delphi"
            className="h-7 w-auto object-contain brightness-0 invert opacity-95"
          />
        </div>

        <div
          className="pt-8 border-t text-sm leading-relaxed space-y-4"
          style={{
            borderColor: 'oklch(0.70 0.15 300)',
            color: 'oklch(0.88 0.02 295)'
          }}
        >
          <p className="font-semibold" style={{ color: 'oklch(0.95 0.01 300)' }}>
            Disclaimer
          </p>
          <p>
            DELPHI is a decentralized finance interface for interacting with Ethereum smart contracts.
            By using this platform, you acknowledge that cryptocurrency investments carry significant risk.
            Digital assets are volatile and you may lose some or all of your deposited funds.
          </p>
          <p>
            DELPHI does not custody your assets and is not responsible for any losses incurred through
            your use of the protocol. Smart contracts have been audited but no audit can guarantee complete
            security. Always do your own research and never deposit more than you can afford to lose.
          </p>
          <p>
            This interface is provided "as is" without warranty of any kind. Use at your own risk.
          </p>
          <p className="pt-4 opacity-75">
            © 2024 DELPHI Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
