import { useState } from "react";
import { RESULTS } from "./results.js";

// ─── TEAMS ───
const TEAMS = {
  t5:  "Lorenzo Sports Club",
  t8:  "Club Kaasinjee",
  t11: "The Wolves Club",
  t15: "Club Zefrol",
  t16: "Odi Sports Club",
  t21: "Zeppo Sports Club",
  t26: "BG Sports Club",
  t32: "Club 010",
};

// ─── MATCH DEFINITIONS ───
// QF = Quarter Final, SF = Semi Final, FIN = Final
const MATCH_DEFS = {
  1: { round: "QF", s1: { t: "t16" }, s2: { t: "t32" } },
  2: { round: "QF", s1: { t: "t21" }, s2: { t: "t8"  } },
  3: { round: "QF", s1: { t: "t26" }, s2: { t: "t15" } },
  4: { round: "QF", s1: { t: "t11" }, s2: { t: "t5"  } },
  5: { round: "SF", s1: { w: 1 },     s2: { w: 2 }     },
  6: { round: "SF", s1: { w: 3 },     s2: { w: 4 }     },
  7: { round: "FIN",s1: { w: 5 },     s2: { w: 6 }     },
};

const ROUNDS = [
  { label: "Quarter Finals", ids: [1, 2, 3, 4] },
  { label: "Semi Finals",    ids: [5, 6] },
  { label: "Final",          ids: [7] },
];

// ─── LOGIC ───
function getSlotTeam(slotDef) {
  if (!slotDef) return null;
  if (slotDef.t) return slotDef.t;
  if (slotDef.w !== undefined) return RESULTS[slotDef.w] || null;
  return null;
}

// ─── COMPONENTS ───
function Slot({ teamKey, winner }) {
  if (!teamKey) return (
    <div style={S.slot}>
      <span style={{ color: "#334155", fontStyle: "italic", fontSize: 11 }}>TBD</span>
    </div>
  );
  const name = TEAMS[teamKey] || teamKey;
  const isWin = winner === teamKey;
  const isLose = winner && winner !== teamKey;
  return (
    <div style={{ ...S.slot, ...(isWin ? S.win : {}), ...(isLose ? S.lose : {}) }}>
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name}
      </span>
      <span style={{
        fontSize: 9, fontFamily: "'IBM Plex Mono',monospace",
        color: isWin ? "#22c55e44" : "#1e3a5f",
        marginLeft: 5, flexShrink: 0,
      }}>
        {teamKey}
      </span>
    </div>
  );
}

function MatchCard({ mid }) {
  const def = MATCH_DEFS[mid];
  const p1 = getSlotTeam(def.s1);
  const p2 = getSlotTeam(def.s2);
  const winner = RESULTS[mid] || null;
  return (
    <div style={{ ...S.card, borderColor: winner ? "#22c55e25" : "#ffffff10" }}>
      <span style={S.mnum}>M{mid}</span>
      <Slot teamKey={p1} winner={winner} />
      <div style={S.div} />
      <Slot teamKey={p2} winner={winner} />
    </div>
  );
}

function RoundCol({ label, ids }) {
  return (
    <div style={S.roundCol}>
      <div style={S.rlabel}>{label}</div>
      <div style={S.matchesCol}>
        {ids.map(mid => <MatchCard key={mid} mid={mid} />)}
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function EidBaibalaa() {
  const played = Object.keys(RESULTS).length;
  const finalDef = MATCH_DEFS[7];
  const champion = RESULTS[7] || null;

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{height:7px;width:7px}
        ::-webkit-scrollbar-track{background:#0c1120}
        ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:4px}
      `}</style>

      {/* HEADER */}
      <div style={S.header}>
        <div>
          <h1 style={S.title}>EID BAIBALAA</h1>
          <div style={S.subtitle}>Challenge 1447 · Knockout Stage · Top 8 · {played}/7 matches played</div>
        </div>
      </div>

      {/* BRACKET */}
      <div style={S.scroll}>
        <div style={S.bracket}>
          {ROUNDS.map(r => <RoundCol key={r.label} label={r.label} ids={r.ids} />)}
        </div>

        {/* CHAMPION */}
        {champion && (
          <div style={S.champWrap}>
            <div style={S.champ}>
              <div style={{ fontSize: 32 }}>🏆</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#0c112088", letterSpacing: 4, marginTop: 6 }}>CHAMPION</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0c1120", marginTop: 4 }}>{TEAMS[champion]}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STYLES ───
const S = {
  root: { fontFamily: "'DM Sans',sans-serif", background: "#0c1120", color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { background: "linear-gradient(135deg,#0f172a,#1a1040)", borderBottom: "2px solid #f97316", padding: "16px 20px" },
  title: { fontWeight: 800, fontSize: 24, letterSpacing: 3, background: "linear-gradient(90deg,#f97316,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
  subtitle: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#64748b", marginTop: 3 },
  scroll: { flex: 1, overflowX: "auto", overflowY: "auto", padding: 24 },
  bracket: { display: "flex", gap: 20, minWidth: "max-content", alignItems: "stretch" },
  roundCol: { display: "flex", flexDirection: "column", minWidth: 220 },
  rlabel: { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, fontWeight: 600, color: "#f97316", textTransform: "uppercase", letterSpacing: 3, padding: "4px 8px", marginBottom: 12, borderLeft: "3px solid #f97316" },
  matchesCol: { display: "flex", flexDirection: "column", justifyContent: "space-around", flex: 1, gap: 10 },
  card: { background: "#111827", border: "1px solid #ffffff10", borderRadius: 6, overflow: "hidden", position: "relative", transition: "border-color .15s" },
  mnum: { position: "absolute", top: 2, right: 5, fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, color: "#334155", zIndex: 1 },
  slot: { padding: "9px 12px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", minHeight: 34, color: "#94a3b8", userSelect: "none" },
  win: { background: "linear-gradient(90deg,#22c55e18,#22c55e08)", color: "#4ade80", fontWeight: 700 },
  lose: { opacity: .35, textDecoration: "line-through" },
  div: { height: 1, background: "#ffffff08" },
  champWrap: { display: "flex", justifyContent: "center", marginTop: 30 },
  champ: { padding: "20px 32px", background: "linear-gradient(135deg,#f97316,#fbbf24)", borderRadius: 12, textAlign: "center", boxShadow: "0 0 30px #f9731630" },
};
