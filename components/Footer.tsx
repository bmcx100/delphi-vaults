export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            DELPHI
          </span>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-sm text-muted-foreground leading-relaxed space-y-4">
          <p className="font-medium">Disclaimer</p>
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
          <p className="pt-4">
            © 2024 DELPHI Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
