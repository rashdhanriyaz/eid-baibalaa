import { useState } from "react";
import { RESULTS } from "./results.js";

// ─── DATA ───
const INIT_TEAMS = {
  t1:"Kuda Henveiru United",   t2:"The One Sports Club",      t3:"Kuda Henveiru Lions",
  t4:"The Beegees",             t5:"Lorenzo Sports Club",      t6:"TC Sports Club",
  t7:"Buru Sports Club",        t8:"Club Kaasinjee",           t9:"Kaasinjaas",
  t10:"TC Fraternity",          t11:"The Wolves Club",         t12:"Janavareeyans",
  t13:"TC Red Lions",           t14:"Club Teenage",            t15:"Club Zefrol",
  t16:"Odi Sports Club",        t17:"SDZ Sharks",              t18:"Odi Titans",
  t19:"Zeppo New Generation",   t20:"Kuda Henveiru Street",    t21:"Zeppo Sports Club",
  t22:"TC Classique",           t23:"LT Sports Club",          t24:"Hahha Vaikanmathi",
  t25:"West Sports Club",       t26:"BG Sports Club",          t27:"Janavaree Magu Sports Club",
  t28:"Alpha Wolves",           t29:"Lorenzo Hyenas",          t30:"JEB United",
  t31:"Teenage Veterans",       t32:"Club 010",                t33:"Meet the Eagles",
  t34:"VNT Sports Club",        t35:"VK Sports Club",          t36:"Hulhumale' Sports Club",
  t37:"Lions & Tigers",         t38:"TFT",
};

const MATCH_DEFS = {
  1:{round:"Upper R1",s1:{t:"t1"},s2:{t:"t2"}},
  2:{round:"Upper R1",s1:{t:"t3"},s2:{t:"t4"}},
  3:{round:"Upper R1",s1:{t:"t5"},s2:{t:"t6"}},
  4:{round:"Upper R1",s1:{t:"t7"},s2:{t:"t8"}},
  5:{round:"Upper R1",s1:{t:"t9"},s2:{t:"t10"}},
  6:{round:"Upper R1",s1:{t:"t11"},s2:{t:"t12"}},
  7:{round:"Upper R2",s1:{t:"t14"},s2:{t:"t15"}},
  8:{round:"Upper R2",s1:{t:"t16"},s2:{t:"t17"}},
  9:{round:"Upper R2",s1:{t:"t18"},s2:{t:"t19"}},
  10:{round:"Upper R2",s1:{t:"t21"},s2:{t:"t22"}},
  11:{round:"Upper R2",s1:{t:"t24"},s2:{t:"t25"}},
  12:{round:"Upper R2",s1:{t:"t27"},s2:{t:"t28"}},
  13:{round:"Upper R2",s1:{t:"t29"},s2:{t:"t30"}},
  14:{round:"Upper R2",s1:{t:"t31"},s2:{t:"t32"}},
  15:{round:"Upper R2",s1:{t:"t34"},s2:{t:"t35"}},
  16:{round:"Upper R2",s1:{t:"t37"},s2:{t:"t38"}},
  17:{round:"Upper R2",s1:{t:"t13"},s2:{w:1}},
  18:{round:"Upper R2",s1:{t:"t20"},s2:{w:2}},
  19:{round:"Upper R2",s1:{t:"t23"},s2:{w:3}},
  20:{round:"Upper R2",s1:{t:"t26"},s2:{w:4}},
  21:{round:"Upper R2",s1:{t:"t33"},s2:{w:5}},
  22:{round:"Upper R2",s1:{t:"t36"},s2:{w:6}},
  37:{round:"Upper R3",s1:{w:8},s2:{w:9}},
  38:{round:"Upper R3",s1:{w:13},s2:{w:14}},
  39:{round:"Upper R3",s1:{w:17},s2:{w:7}},
  40:{round:"Upper R3",s1:{w:18},s2:{w:10}},
  41:{round:"Upper R3",s1:{w:19},s2:{w:11}},
  42:{round:"Upper R3",s1:{w:20},s2:{w:12}},
  43:{round:"Upper R3",s1:{w:21},s2:{w:15}},
  44:{round:"Upper R3",s1:{w:22},s2:{w:16}},
  57:{round:"Upper QF",s1:{w:39},s2:{w:37}},
  58:{round:"Upper QF",s1:{w:40},s2:{w:41}},
  59:{round:"Upper QF",s1:{w:42},s2:{w:38}},
  60:{round:"Upper QF",s1:{w:43},s2:{w:44}},
  67:{round:"Upper SF",s1:{w:57},s2:{w:58}},
  68:{round:"Upper SF",s1:{w:59},s2:{w:60}},
  72:{round:"Upper Final",s1:{w:67},s2:{w:68}},
  23:{round:"Losers R1",s1:{l:7},s2:{l:6}},
  24:{round:"Losers R1",s1:{l:9},s2:{l:5}},
  25:{round:"Losers R1",s1:{l:11},s2:{l:4}},
  26:{round:"Losers R1",s1:{l:12},s2:{l:3}},
  27:{round:"Losers R1",s1:{l:14},s2:{l:2}},
  28:{round:"Losers R1",s1:{l:16},s2:{l:1}},
  29:{round:"Losers R2",s1:{l:10},s2:{l:18}},
  30:{round:"Losers R2",s1:{l:15},s2:{l:21}},
  31:{round:"Losers R2",s1:{l:17},s2:{w:23}},
  32:{round:"Losers R2",s1:{l:8},s2:{w:24}},
  33:{round:"Losers R2",s1:{l:19},s2:{w:25}},
  34:{round:"Losers R2",s1:{l:20},s2:{w:26}},
  35:{round:"Losers R2",s1:{l:13},s2:{w:27}},
  36:{round:"Losers R2",s1:{l:22},s2:{w:28}},
  45:{round:"Losers R3",s1:{l:37},s2:{w:35}},
  46:{round:"Losers R3",s1:{l:38},s2:{w:32}},
  47:{round:"Losers R3",s1:{l:39},s2:{w:34}},
  48:{round:"Losers R3",s1:{l:40},s2:{w:30}},
  49:{round:"Losers R3",s1:{l:41},s2:{w:36}},
  50:{round:"Losers R3",s1:{l:42},s2:{w:31}},
  51:{round:"Losers R3",s1:{l:43},s2:{w:29}},
  52:{round:"Losers R3",s1:{l:44},s2:{w:33}},
  53:{round:"Losers R4",s1:{w:45},s2:{w:47}},
  54:{round:"Losers R4",s1:{w:49},s2:{w:48}},
  55:{round:"Losers R4",s1:{w:46},s2:{w:50}},
  56:{round:"Losers R4",s1:{w:52},s2:{w:51}},
  61:{round:"Losers R5",s1:{w:56},s2:{l:57}},
  62:{round:"Losers R5",s1:{w:55},s2:{l:58}},
  63:{round:"Losers R5",s1:{w:54},s2:{l:59}},
  64:{round:"Losers R5",s1:{w:53},s2:{l:60}},
  65:{round:"Losers R6",s1:{w:61},s2:{w:62}},
  66:{round:"Losers R6",s1:{w:63},s2:{w:64}},
  69:{round:"Losers R7",s1:{w:66},s2:{l:67}},
  70:{round:"Losers R7",s1:{w:65},s2:{l:68}},
  71:{round:"Losers R8",s1:{w:69},s2:{w:70}},
  73:{round:"Losers Final",s1:{w:71},s2:{l:72}},
  74:{round:"Grand Final",s1:{w:72},s2:{w:73}},
};

const UPPER_ROUNDS = [
  {key:"Upper R1",    label:"Round 1",      ids:[1,2,3,4,5,6]},
  {key:"Upper R2",    label:"Round 2",      ids:[17,7,8,9,18,10,19,11,20,12,13,14,21,15,22,16]},
  {key:"Upper R3",    label:"Round 3",      ids:[39,37,40,41,42,38,43,44]},
  {key:"Upper QF",    label:"Quarter Finals",ids:[57,58,59,60]},
  {key:"Upper SF",    label:"Semi Finals",  ids:[67,68]},
  {key:"Upper Final", label:"Upper Final",  ids:[72]},
];
const LOWER_ROUNDS = [
  {key:"Losers R1",    label:"Losers R1",    ids:[28,27,26,25,24,23]},
  {key:"Losers R2",    label:"Losers R2",    ids:[36,30,35,34,33,29,32,31]},
  {key:"Losers R3",    label:"Losers R3",    ids:[49,48,45,47,52,51,46,50], drop:true},
  {key:"Losers R4",    label:"Losers R4",    ids:[54,53,56,55]},
  {key:"Losers R5",    label:"Losers R5",    ids:[63,64,61,62],             drop:true},
  {key:"Losers R6",    label:"Losers R6",    ids:[66,65]},
  {key:"Losers R7",    label:"Losers R7",    ids:[69,70],                   drop:true},
  {key:"Losers R8",    label:"Losers R8",    ids:[71]},
  {key:"Losers Final", label:"Losers Final", ids:[73],                      drop:true},
];

// ─── LOGIC ───
function getSlotTeam(slotDef, results) {
  if (!slotDef) return null;
  if (slotDef.t) return slotDef.t;
  if (slotDef.w !== undefined) return results[slotDef.w] || null;
  if (slotDef.l !== undefined) {
    const w = results[slotDef.l];
    if (!w) return null;
    const def = MATCH_DEFS[slotDef.l];
    const t1 = getSlotTeam(def.s1, results);
    const t2 = getSlotTeam(def.s2, results);
    return w === t1 ? t2 : w === t2 ? t1 : null;
  }
  return null;
}

// ─── COMPONENTS ───

function Slot({ teamKey, winner, teams }) {
  if (!teamKey) {
    return (
      <div style={S.slot}>
        <span style={{ color: "#334155", fontStyle: "italic", fontSize: 11 }}>TBD</span>
      </div>
    );
  }
  const name  = teams[teamKey] || teamKey;
  const isWin  = winner === teamKey;
  const isLose = winner && winner !== teamKey;

  return (
    <div style={{ ...S.slot, ...(isWin ? S.win : {}), ...(isLose ? S.lose : {}) }}>
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name}
      </span>
      <span style={{
        fontSize: 9,
        fontFamily: "'IBM Plex Mono',monospace",
        color: isWin ? "#22c55e44" : "#1e3a5f",
        marginLeft: 5,
        flexShrink: 0,
        letterSpacing: 0,
      }}>
        {teamKey}
      </span>
    </div>
  );
}

function MatchCard({ mid, results, teams }) {
  const def    = MATCH_DEFS[mid];
  const p1     = getSlotTeam(def.s1, results);
  const p2     = getSlotTeam(def.s2, results);
  const winner = results[mid] || null;

  return (
    <div style={{ ...S.card, borderColor: winner ? "#22c55e25" : "#ffffff10" }}>
      <span style={S.mnum}>M{mid}</span>
      <Slot teamKey={p1} winner={winner} teams={teams} />
      <div style={S.div} />
      <Slot teamKey={p2} winner={winner} teams={teams} />
    </div>
  );
}

function RoundCol({ label, ids, drop, results, teams }) {
  return (
    <div style={S.roundCol}>
      <div style={{ ...S.rlabel, borderLeftColor: drop ? "#3b82f6" : "#f97316" }}>
        {label}
        {drop && <span style={{ color: "#3b82f6", fontSize: 8, marginLeft: 6 }}>DROP</span>}
      </div>
      <div style={S.matchesCol}>
        {ids.map(mid => <MatchCard key={mid} mid={mid} results={results} teams={teams} />)}
      </div>
    </div>
  );
}

function GFSlot({ label, teamKey, winner, teams }) {
  const name   = teamKey ? (teams[teamKey] || teamKey) : "Awaiting...";
  const isWin  = winner === teamKey;
  const isLose = winner && winner !== teamKey;

  return (
    <div style={{
      ...S.gfs,
      ...(isWin  ? S.gfWin : {}),
      ...(isLose ? { opacity: .35, textDecoration: "line-through" } : {}),
    }}>
      <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <span>{name}</span>
        {teamKey && (
          <span style={{
            fontSize: 9,
            fontFamily: "'IBM Plex Mono',monospace",
            color: isWin ? "#0c112044" : "#1e3a5f",
            flexShrink: 0,
          }}>
            {teamKey}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function EidBaibalaa() {
  const teams  = INIT_TEAMS;
  const [tab,  setTab] = useState("upper");

  // Results come from src/results.js — edit that file on GitHub to update scores.
  const results = RESULTS;

  const played   = Object.keys(results).length;
  const gfDef    = MATCH_DEFS[74];
  const gfP1     = getSlotTeam(gfDef.s1, results);
  const gfP2     = getSlotTeam(gfDef.s2, results);
  const gfWinner = results[74] || null;

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
          <div style={S.subtitle}>Double Elimination · 38 Teams · {played} matches played</div>
        </div>
      </div>

      {/* TABS */}
      <div style={S.tabs}>
        {[{k:"upper",l:"Winners"},{k:"lower",l:"Losers"},{k:"finals",l:"Grand Finals"}].map(t => (
          <button key={t.k} style={{ ...S.tab, ...(tab === t.k ? S.tabOn : {}) }} onClick={() => setTab(t.k)}>
            {t.l}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={S.scroll}>
        {tab === "upper" && (
          <div style={S.bracket}>
            {UPPER_ROUNDS.map(r => (
              <RoundCol key={r.key} label={r.label} ids={r.ids} results={results} teams={teams} />
            ))}
          </div>
        )}
        {tab === "lower" && (
          <div style={S.bracket}>
            {LOWER_ROUNDS.map(r => (
              <RoundCol key={r.key} label={r.label} ids={r.ids} drop={r.drop} results={results} teams={teams} />
            ))}
          </div>
        )}
        {tab === "finals" && (
          <div style={S.finals}>
            <div style={S.gfCard}>
              <h3 style={S.gfTitle}>Grand Final</h3>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                Winners Bracket Champion vs Losers Bracket Champion
              </div>
              <div style={{ marginTop: 16 }}>
                <GFSlot label="From Winners" teamKey={gfP1} winner={gfWinner} teams={teams} />
                <div style={S.gfVs}>VS</div>
                <GFSlot label="From Losers"  teamKey={gfP2} winner={gfWinner} teams={teams} />
              </div>
              {gfWinner && (
                <div style={S.champ}>
                  <div style={{ fontSize: 28 }}>🏆</div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#0c112088", letterSpacing: 4, marginTop: 4 }}>CHAMPION</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#0c1120", marginTop: 2 }}>{teams[gfWinner]}</div>
                </div>
              )}
            </div>
            <div style={S.hint}>Results are updated via <code style={{ fontSize: 11 }}>src/results.js</code> on GitHub</div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── STYLES ───
const S = {
  root:      { fontFamily: "'DM Sans',sans-serif", background: "#0c1120", color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header:    { background: "linear-gradient(135deg,#0f172a,#1a1040)", borderBottom: "2px solid #f97316", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  title:     { fontWeight: 800, fontSize: 22, letterSpacing: 3, background: "linear-gradient(90deg,#f97316,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
  subtitle:  { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#64748b", marginTop: 2 },
  tabs:      { display: "flex", background: "#0f172a", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 10 },
  tab:       { flex: 1, padding: "11px 8px", textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", border: "none", background: "transparent", color: "#475569", borderBottom: "3px solid transparent", transition: "all .15s" },
  tabOn:     { color: "#f97316", borderBottomColor: "#f97316", background: "#f9731608" },
  scroll:    { flex: 1, overflowX: "auto", overflowY: "auto", padding: 20 },
  bracket:   { display: "flex", gap: 12, minWidth: "max-content", alignItems: "stretch" },
  roundCol:  { display: "flex", flexDirection: "column", minWidth: 200 },
  rlabel:    { fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 2, padding: "4px 8px", marginBottom: 8, borderLeft: "3px solid #f97316" },
  matchesCol:{ display: "flex", flexDirection: "column", justifyContent: "space-around", flex: 1, gap: 4 },
  card:      { background: "#111827", border: "1px solid #ffffff10", borderRadius: 6, overflow: "hidden", position: "relative", transition: "border-color .15s" },
  mnum:      { position: "absolute", top: 2, right: 5, fontFamily: "'IBM Plex Mono',monospace", fontSize: 8, color: "#334155", zIndex: 1 },
  slot:      { padding: "7px 10px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", minHeight: 30, color: "#94a3b8", userSelect: "none" },
  win:       { background: "linear-gradient(90deg,#22c55e18,#22c55e08)", color: "#4ade80", fontWeight: 700 },
  lose:      { opacity: .35, textDecoration: "line-through" },
  div:       { height: 1, background: "#ffffff08" },
  finals:    { display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" },
  gfCard:    { background: "linear-gradient(135deg,#1a1040,#0f172a)", border: "2px solid #f97316", borderRadius: 12, padding: 28, minWidth: 320, maxWidth: 420, textAlign: "center" },
  gfTitle:   { fontWeight: 800, fontSize: 18, letterSpacing: 3, color: "#f97316", margin: 0 },
  gfs:       { padding: "14px 18px", fontWeight: 700, fontSize: 15, borderRadius: 8, margin: "6px 0", color: "#94a3b8", background: "#111827", userSelect: "none" },
  gfWin:     { background: "linear-gradient(90deg,#f97316,#fbbf24)", color: "#0c1120" },
  gfVs:      { fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "#475569", margin: "4px 0", letterSpacing: 2, textAlign: "center" },
  champ:     { marginTop: 20, padding: "16px 24px", background: "linear-gradient(135deg,#f97316,#fbbf24)", borderRadius: 12, textAlign: "center" },
  hint:      { marginTop: 20, fontSize: 12, color: "#475569", fontFamily: "'IBM Plex Mono',monospace", textAlign: "center" },
};
