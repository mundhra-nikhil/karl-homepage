/**
 * BottomBar — thin strip below the hero showing target industries and a CTA.
 * Stateless; no props required.
 */
export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="bb-left">
        <span className="bb-label">Built for enterprise teams in:</span>
        <div className="industries">
          <div className="industry">Manufacturing</div>
          <div className="industry">Retail</div>
          <div className="industry">Pharma</div>
          <div className="industry">Financial Services</div>
        </div>
      </div>
      <div className="bb-right">
        <a href="#">See how it works -&gt;</a>
      </div>
    </div>
  );
}
