import { useState } from "react";

const PURPLE = "#5B0E91";
const GOLD = "#F5A800";
const DARK = "#1a0a2e";
const LIGHT_BG = "#f9f7f2";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <div
      style={{
        background: PURPLE,
        color: "#fff",
        padding: "6px 14px",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 2,
        marginBottom: 0,
      }}
    >
      {title}
    </div>
    <div style={{ border: `1px solid #e0d8f0`, borderTop: "none" }}>
      {children}
    </div>
  </div>
);

interface RowProps {
  label: any;
  value: any;
  highlight?: boolean;
  note?: any;
  sub?: any;
}
const Row = ({ label, value, highlight, note, sub }: RowProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      background: highlight ? "#fff8e7" : "#fff",
      borderBottom: "1px solid #eee",
      gap: 8,
    }}
  >
    <span style={{ fontSize: 13, color: "#333", flex: 1 }}>
      {label}
      {note && (
        <span style={{ fontSize: 11, color: "#888", marginLeft: 6 }}>
          ({note})
        </span>
      )}
      {sub && (
        <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div>
      )}
    </span>
    <span
      style={{
        fontWeight: highlight ? 700 : 500,
        color: highlight ? PURPLE : "#111",
        fontSize: highlight ? 15 : 13,
        minWidth: 130,
        textAlign: "right",
      }}
    >
      {value}
    </span>
  </div>
);

const Select = ({
  label,
  value,
  onChange,
  options,
  sub,
}: {
  label: any;
  value: any;
  onChange: any;
  options: any;
  sub?: any;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      gap: 8,
    }}
  >
    <span style={{ fontSize: 13, color: "#333", flex: 1 }}>
      {label}
      {sub && (
        <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div>
      )}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontSize: 12,
        padding: "4px 8px",
        border: `1px solid ${GOLD}`,
        borderRadius: 4,
        minWidth: 200,
        background: "#fff",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const NumberInput = ({ label, value, onChange, min = 0 }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      background: "#fff",
      borderBottom: "1px solid #eee",
    }}
  >
    <span style={{ fontSize: 13, color: "#333" }}>{label}</span>
    <input
      type="number"
      value={value}
      min={min}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{
        fontSize: 13,
        padding: "4px 8px",
        border: `1px solid ${GOLD}`,
        borderRadius: 4,
        width: 90,
        textAlign: "right",
      }}
    />
  </div>
);

const CheckRow = ({ label, checked, onChange, sub }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 14px",
      background: "#fff",
      borderBottom: "1px solid #eee",
    }}
  >
    <span style={{ fontSize: 13, color: "#333", flex: 1 }}>
      {label}
      {sub && (
        <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{sub}</div>
      )}
    </span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{ width: 18, height: 18, accentColor: GOLD }}
    />
  </div>
);

const fmt = (n) => (n === 0 ? "₦0" : "₦" + Math.round(n).toLocaleString());
const TAB = {
  PROJECT: "project",
  WAREHOUSE: "warehouse",
  SUBSCRIPTION: "subscription",
};

// --- Pricing tables ---
const DECOR = { boutique: 200000, standard: 550000, grand: 1200000 };
const LOGISTICS = { boutique: 80000, standard: 120000, grand: 300000 };
const WAREHOUSE_SKU = [
  { value: "w500", label: "Up to 500 SKUs — 1 Auditor", fee: 250000 },
  { value: "w1500", label: "500–1,500 SKUs — 2 Auditors", fee: 500000 },
  {
    value: "w10000",
    label: "1,500–10,000 SKUs — 3 Auditors + 1 Supervisor",
    fee: 1000000,
  },
  {
    value: "w10kplus",
    label: "10,000 SKUs — Lead Supervisor + 3 Auditors + Shelf Coding",
    fee: 1500000,
  },
];

export default function Calculator() {
  const [tab, setTab] = useState(TAB.PROJECT);

  // --- Project Tab ---
  const [scale, setScale] = useState("standard");
  const [venue, setVenue] = useState("standard");
  const [extraDays, setExtraDays] = useState(0);
  const [complexity, setComplexity] = useState("none");
  const [inclDecor, setInclDecor] = useState(true);
  const [inclLogistics, setInclLogistics] = useState(true);
  const [digitalMode, setDigitalMode] = useState("bundle"); // none | standalone | bundle
  const [multiLoc, setMultiLoc] = useState(false);
  const [overnight, setOvernight] = useState(0);
  const [rush, setRush] = useState(false);
  const [grandStaff, setGrandStaff] = useState(false);
  const [megaStaff, setMegaStaff] = useState(false);
  const [concurrent, setConcurrent] = useState("none");

  const decorFee = inclDecor ? DECOR[scale] : 0;
  const logisticsFee = inclLogistics ? LOGISTICS[scale] : 0;
  const digitalFee =
    digitalMode === "bundle"
      ? 200000
      : digitalMode === "standalone"
        ? 50000
        : 0;
  const venueSurcharge =
    venue === "complex" ? 50000 : venue === "outofstate" ? 150000 : 0;
  const extendedDay = extraDays * 75000;
  const complexityFee =
    complexity === "rigging" ? 100000 : complexity === "structural" ? 75000 : 0;
  const multiLocFee = multiLoc ? 80000 : 0;
  const overnightFee = overnight * 45000;
  const grandFee = grandStaff ? 50000 : 0;
  const megaFee = megaStaff ? 150000 : 0;
  const concurrencyFee = concurrent === "two" ? 120000 : 0;

  const subtotal =
    decorFee +
    logisticsFee +
    digitalFee +
    venueSurcharge +
    extendedDay +
    complexityFee +
    multiLocFee +
    overnightFee +
    grandFee +
    megaFee +
    concurrencyFee;
  const rushAdd = rush ? subtotal * 0.3 : 0;
  const total = subtotal + rushAdd;

  // --- Warehouse Tab ---
  const [wSku, setWSku] = useState("w500");
  const [wMonths, setWMonths] = useState(3);
  const [wExtra, setWExtra] = useState(false);
  const wPkg = WAREHOUSE_SKU.find((x) => x.value === wSku);
  const wBase = wPkg.fee;
  const wExtraFee = wExtra ? 150000 : 0;
  const wMonthly = wBase + wExtraFee;
  const wTotal = wMonthly * wMonths;

  // --- Subscription / Training Tab ---
  const [pkg, setPkg] = useState("starter");
  const [months, setMonths] = useState(3);
  const [addTraining, setAddTraining] = useState(false);
  const [addOnsite, setAddOnsite] = useState(false);
  const pkgData = {
    starter: {
      label: "Starter – Warehouse & 500 Assets",
      monthly: 150000,
      assets: 500,
    },
    pro: {
      label: "Pro Inventory – Up to 1,000 Assets",
      monthly: 250000,
      assets: 1000,
    },
    bundle: {
      label: "Full Starter Suite (Bundle)",
      monthly: 500000,
      assets: 1000,
      bundle: true,
    },
  };
  const sel = pkgData[pkg];
  const trainingAdd = !sel.bundle && addTraining ? 180000 : 0;
  const onsiteAdd = !sel.bundle && addOnsite ? 50000 : 0;
  const monthlyTotal = sel.monthly + trainingAdd + onsiteAdd;
  const programmeTotal = monthlyTotal * months;
  const mobilisation = monthlyTotal * 0.5;

  const tabs = [
    { key: TAB.PROJECT, label: "🎪 Event Project" },
    { key: TAB.WAREHOUSE, label: "🏭 Warehouse Retainer" },
    { key: TAB.SUBSCRIPTION, label: "📅 Starter / Training" },
  ];

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: LIGHT_BG,
        minHeight: "100vh",
        padding: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: DARK,
          color: "#fff",
          padding: "16px 18px",
          marginBottom: 20,
          borderBottom: `3px solid ${GOLD}`,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 3,
            color: GOLD,
            marginBottom: 3,
          }}
        >
          STERLING EXPERIENCES
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Project Calculator</div>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
          Professional Services & Rate Card 2026 · All figures in Naira (₦)
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 20, gap: 3 }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              padding: "9px 4px",
              fontSize: 11,
              fontWeight: tab === t.key ? 700 : 400,
              border: "none",
              cursor: "pointer",
              background: tab === t.key ? PURPLE : "#ddd",
              color: tab === t.key ? "#fff" : "#444",
              borderRadius: "4px 4px 0 0",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PROJECT TAB ── */}
      {tab === TAB.PROJECT && (
        <>
          <Section title="EVENT SCALE">
            <Select
              label="Event Scale"
              value={scale}
              onChange={setScale}
              options={[
                { value: "boutique", label: "Boutique (≤150 guests)" },
                { value: "standard", label: "Standard (200–500 guests)" },
                { value: "grand", label: "Grand (600+ guests)" },
              ]}
            />
            <Select
              label="Venue Type"
              value={venue}
              onChange={setVenue}
              options={[
                { value: "standard", label: "Standard" },
                { value: "complex", label: "Complex (+₦50,000)" },
                { value: "outofstate", label: "Out-of-State (+₦150,000)" },
              ]}
            />
            <NumberInput
              label="Extra Setup Days (beyond Day 2)"
              value={extraDays}
              onChange={setExtraDays}
              min={0}
            />
          </Section>

          <Section title="SERVICES INCLUDED">
            <CheckRow
              label="Decor Coordination"
              checked={inclDecor}
              onChange={setInclDecor}
              sub={`Boutique ₦200k · Standard ₦550k · Grand ₦1.2M`}
            />
            <CheckRow
              label="Logistics Coordination"
              checked={inclLogistics}
              onChange={setInclLogistics}
              sub={`Boutique ₦80k · Standard ₦120k · Grand ₦300k`}
            />
            <Select
              label="Digital Asset Protection"
              value={digitalMode}
              onChange={setDigitalMode}
              options={[
                { value: "none", label: "Not included" },
                { value: "standalone", label: "Standalone (₦50,000)" },
                { value: "bundle", label: "Bundled with Logistics (₦200,000)" },
              ]}
            />
          </Section>

          <Section title="ADD-ONS & SURCHARGES">
            <Select
              label="Design Complexity"
              value={complexity}
              onChange={setComplexity}
              options={[
                { value: "none", label: "Standard — no surcharge" },
                { value: "rigging", label: "High-Rigging (+₦100,000)" },
                { value: "structural", label: "Structural Build (+₦75,000)" },
              ]}
            />
            <CheckRow
              label="Multi-Location Fee"
              checked={multiLoc}
              onChange={setMultiLoc}
              sub="More than one zone or venue (+₦80,000)"
            />
            <NumberInput
              label="Overnight Stays (coordinators)"
              value={overnight}
              onChange={setOvernight}
              min={0}
            />
            <CheckRow
              label="Grand Staffing Add-on"
              checked={grandStaff}
              onChange={setGrandStaff}
              sub="Events 500–999 guests (+₦50,000)"
            />
            <CheckRow
              label="Mega Staffing Add-on"
              checked={megaStaff}
              onChange={setMegaStaff}
              sub="Events 1,000+ guests (+₦150,000)"
            />
            <Select
              label="Concurrent Events"
              value={concurrent}
              onChange={setConcurrent}
              options={[
                { value: "none", label: "Single event" },
                { value: "two", label: "2 simultaneous events (+₦120,000)" },
                { value: "three", label: "3+ events — custom quote" },
              ]}
            />
            <CheckRow
              label="Rush Booking (<72 hrs)"
              checked={rush}
              onChange={setRush}
              sub="+30% on total quote"
            />
          </Section>

          <Section title="INVESTMENT SUMMARY">
            {inclDecor && (
              <Row
                label="Decor Coordination"
                value={fmt(decorFee)}
                note={scale}
              />
            )}
            {inclLogistics && (
              <Row
                label="Logistics Coordination"
                value={fmt(logisticsFee)}
                note={scale}
              />
            )}
            {digitalMode !== "none" && (
              <Row
                label="Digital Asset Protection"
                value={fmt(digitalFee)}
                note={digitalMode}
              />
            )}
            {venueSurcharge > 0 && (
              <Row
                label="Venue / Travel Surcharge"
                value={fmt(venueSurcharge)}
              />
            )}
            {extendedDay > 0 && (
              <Row
                label={`Extended Days (${extraDays}d × ₦75k)`}
                value={fmt(extendedDay)}
              />
            )}
            {complexityFee > 0 && (
              <Row label="Complexity Surcharge" value={fmt(complexityFee)} />
            )}
            {multiLocFee > 0 && (
              <Row label="Multi-Location Fee" value={fmt(multiLocFee)} />
            )}
            {overnightFee > 0 && (
              <Row
                label={`Overnight (${overnight} × ₦45k)`}
                value={fmt(overnightFee)}
              />
            )}
            {grandFee > 0 && (
              <Row label="Grand Staffing Add-on" value={fmt(grandFee)} />
            )}
            {megaFee > 0 && (
              <Row label="Mega Staffing Add-on" value={fmt(megaFee)} />
            )}
            {concurrencyFee > 0 && (
              <Row label="Concurrency Fee" value={fmt(concurrencyFee)} />
            )}
            {rushAdd > 0 && (
              <Row label="Rush Booking (+30%)" value={fmt(rushAdd)} />
            )}
            {concurrent === "three" && (
              <Row label="3+ Concurrent Events" value="Custom Quote" />
            )}
            <Row label="TOTAL QUOTE" value={fmt(total)} highlight />
            <Row label="Mobilisation Deposit (70%)" value={fmt(total * 0.7)} />
            <Row label="Final Balance (30%)" value={fmt(total * 0.3)} />
          </Section>
        </>
      )}

      {/* ── WAREHOUSE TAB ── */}
      {tab === TAB.WAREHOUSE && (
        <>
          <Section title="WAREHOUSE MANAGEMENT — MONTHLY RETAINER">
            <Select
              label="Inventory Scale (SKUs)"
              value={wSku}
              onChange={setWSku}
              sub="Staffing assigned automatically by tier"
              options={WAREHOUSE_SKU.map((x) => ({
                value: x.value,
                label: `${x.label} — ${fmt(x.fee)}/mo`,
              }))}
            />
            <NumberInput
              label="Contract Duration (Months)"
              value={wMonths}
              onChange={setWMonths}
              min={3}
            />
            <CheckRow
              label="Second Location Surcharge"
              checked={wExtra}
              onChange={setWExtra}
              sub="Multi-location inventory (+₦150,000/mo)"
            />
          </Section>

          <Section title="STAFFING ASSIGNMENT">
            <Row label="Tier" value={wPkg.label} />
            {wSku === "w500" && (
              <Row label="Team" value="1 × Warehouse Auditor" />
            )}
            {wSku === "w1500" && (
              <Row label="Team" value="2 × Warehouse Auditors" />
            )}
            {wSku === "w10000" && (
              <Row label="Team" value="3 × Auditors + 1 × Supervisor" />
            )}
            {wSku === "w10kplus" && (
              <Row
                label="Team"
                value="1 Lead Supervisor + 3 Auditors + Shelf Coding"
              />
            )}
            {wSku === "w10kplus" && (
              <Row
                label="Note"
                value="Variable by sq. footage / multi-location"
              />
            )}
            <Row label="Minimum Commitment" value="3 months" />
          </Section>

          <Section title="WHAT'S INCLUDED">
            <Row
              label="Full digital inventory catalogue"
              value="✅ QR / Item ID tagging"
            />
            <Row
              label="Monthly condition audit"
              value="✅ Written report + ₦ valuation"
            />
            <Row
              label="Post-event fabric & floral care"
              value="✅ Protocol included"
            />
            <Row
              label="Damaged item quarantine system"
              value="✅ Photography + docs"
            />
            <Row
              label="Low-stock consumable alerts"
              value="✅ Foam, tissue, cable ties"
            />
          </Section>

          <Section title="INVESTMENT SUMMARY">
            <Row
              label="Base Warehouse Fee"
              value={fmt(wBase) + "/mo"}
              note={wPkg.label.split("—")[0].trim()}
            />
            {wExtra && (
              <Row label="2nd Location Surcharge" value="₦150,000/mo" />
            )}
            <Row
              label="Monthly Total"
              value={fmt(wMonthly) + "/mo"}
              highlight
            />
            <Row
              label={`Programme Total (${wMonths} months)`}
              value={fmt(wTotal)}
              highlight
            />
            <Row
              label="Mobilisation (1st Month, 100% in advance)"
              value={fmt(wMonthly)}
            />
          </Section>
        </>
      )}

      {/* ── SUBSCRIPTION / TRAINING TAB ── */}
      {tab === TAB.SUBSCRIPTION && (
        <>
          <Section title="SUBSCRIPTION PACKAGE — SELECT">
            <Select
              label="Package"
              value={pkg}
              onChange={(v) => {
                setPkg(v);
                if (v === "bundle") {
                  setAddTraining(false);
                  setAddOnsite(false);
                }
              }}
              options={[
                {
                  value: "starter",
                  label: "Starter – Warehouse & 500 Assets (₦150k/mo)",
                },
                {
                  value: "pro",
                  label: "Pro Inventory – 1,000 Assets (₦250k/mo)",
                },
                {
                  value: "bundle",
                  label: "Full Starter Suite Bundle (₦500k/mo)",
                },
              ]}
            />
            <NumberInput
              label="Contract Duration (Months)"
              value={months}
              onChange={setMonths}
              min={3}
            />
            {!sel.bundle && (
              <>
                <CheckRow
                  label="Add Training Retainer"
                  checked={addTraining}
                  onChange={setAddTraining}
                  sub="+₦180,000/mo · Sterling trainer + full curriculum"
                />
                <CheckRow
                  label="Add Monthly On-Site Visit"
                  checked={addOnsite}
                  onChange={setAddOnsite}
                  sub="+₦50,000/mo"
                />
              </>
            )}
          </Section>

          <Section title="PACKAGE DETAILS">
            <Row label="Package" value={sel.label} />
            <Row
              label="Asset Capacity"
              value={`Up to ${sel.assets.toLocaleString()} items`}
            />
            <Row
              label="Includes Training"
              value={
                sel.bundle
                  ? "✅ Yes"
                  : addTraining
                    ? "✅ Yes (add-on)"
                    : "❌ No"
              }
            />
            <Row
              label="Monthly On-Site Visit"
              value={
                sel.bundle
                  ? "✅ 1 included"
                  : addOnsite
                    ? "✅ Yes (add-on)"
                    : "❌ No"
              }
            />
            <Row label="Minimum Commitment" value="3 months" />
            {sel.bundle && (
              <Row
                label="Bundle Saving"
                value="Save ₦80,000/mo vs. individual"
              />
            )}
          </Section>

          <Section title="INVESTMENT SUMMARY">
            <Row label="Base Package Fee" value={fmt(sel.monthly) + "/mo"} />
            {trainingAdd > 0 && (
              <Row
                label="Training Retainer Add-On"
                value={fmt(trainingAdd) + "/mo"}
              />
            )}
            {onsiteAdd > 0 && (
              <Row
                label="On-Site Visit Add-On"
                value={fmt(onsiteAdd) + "/mo"}
              />
            )}
            <Row
              label="Monthly Total"
              value={fmt(monthlyTotal) + "/mo"}
              highlight
            />
            <Row
              label={`Programme Total (${months} months)`}
              value={fmt(programmeTotal)}
              highlight
            />
            <Row
              label="First Month Mobilisation (50%)"
              value={fmt(mobilisation)}
            />
          </Section>

          <div
            style={{
              background: "#fff8e7",
              border: `1px solid ${GOLD}`,
              borderRadius: 4,
              padding: "12px 14px",
              fontSize: 12,
              color: "#555",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: GOLD }}>Subscription Terms:</strong>{" "}
            Decorator bears all maintenance and staffing costs. Sterling
            provides the trainer, system setup, and curriculum. Certificate
            issued on completion of all competency sign-offs. Packages are
            renewable quarterly after the initial 3-month term.
          </div>
        </>
      )}

      <div
        style={{
          marginTop: 16,
          fontSize: 11,
          color: "#999",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        sterlingxperiences.com · admin@sterlingxperiences.com · +234 708 930
        0072
        <br />
        Strictly Confidential · Rate Card 2026 · Valid 90 days from issue
      </div>
    </div>
  );
}
