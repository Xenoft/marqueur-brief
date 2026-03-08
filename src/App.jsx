import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const C = {
  black:   "#1A1414",
  white:   "#F5F5F5",
  yellow:  "#E8FF47",
  blue:    "#4100F5",
  accent:  "#F5F5F5",
  gray1:   "#221c1c",
  gray2:   "#2a2222",
  gray3:   "#332a2a",
  muted:   "#5a5050",
  dim:     "#8a7e7e",
  err:     "#ff5a5a",
  border:  "#2e2525",
};

// ─── Marqueur Wordmark SVG ────────────────────────────────────────────────────
const MarqueurLogo = ({ color = C.white, height = 22 }) => (
  <svg height={height} viewBox="0 0 579 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M562.815 51.545L578.434 78.8779H562.592L549.539 54.6687C548.646 54.7803 547.642 54.7803 546.638 54.7803H530.796V78.8779H516.293V0.783813H546.638C565.604 0.783813 577.43 11.1592 577.43 27.7821C577.43 38.9384 572.074 47.3056 562.815 51.545ZM546.638 13.2789H530.796V42.2853H546.638C556.233 42.2853 561.922 37.488 561.922 27.7821C561.922 18.0761 556.233 13.2789 546.638 13.2789Z" fill={color}/>
    <path d="M509.649 46.19C509.649 71.1801 494.365 79.7704 477.072 79.7704C459.78 79.7704 444.496 71.1801 444.496 46.19V0.783813H459.222V46.3015C459.222 58.7966 465.805 67.3869 477.072 67.3869C488.34 67.3869 494.923 58.7966 494.923 46.3015V0.783813H509.649V46.19Z" fill={color}/>
    <path d="M438.725 0.783813V13.6136H397.224V33.4718H433.035V46.19H397.224V66.0482H438.725V78.8779H382.832V0.783813H438.725Z" fill={color}/>
    <path d="M376.188 46.19C376.188 71.1801 360.904 79.7704 343.612 79.7704C326.319 79.7704 311.035 71.1801 311.035 46.19V0.783813H325.761V46.3015C325.761 58.7966 332.344 67.3869 343.612 67.3869C354.879 67.3869 361.462 58.7966 361.462 46.3015V0.783813H376.188V46.19Z" fill={color}/>
    <path d="M305.247 66.8291V79.101C297.884 79.101 291.86 77.5391 286.839 75.0847C281.261 78.0969 274.679 79.5473 267.762 79.6588C247.234 79.882 230.5 66.9406 230.5 39.8308C230.5 12.721 247.234 -0.220294 267.762 0.00283583C288.29 0.225959 305.136 12.8326 305.024 39.8308C305.024 50.9871 302.235 59.689 297.438 66.0481C299.669 66.606 302.235 66.8291 305.247 66.8291ZM245.561 39.8308C245.561 60.2469 254.486 67.0522 267.762 66.9406C270.216 66.9406 272.559 66.7175 274.791 66.1597C272.782 64.2631 271.22 62.3666 269.659 60.5815L279.811 53.1068C281.596 55.3381 283.269 57.4578 285.166 59.3544C288.178 55.115 289.963 48.7559 289.963 39.8308C289.963 19.3032 280.926 12.8326 267.762 12.721C254.486 12.6095 245.561 19.4148 245.561 39.8308Z" fill={color}/>
    <path d="M209.932 51.545L225.551 78.8779H209.709L196.656 54.6687C195.763 54.7803 194.759 54.7803 193.755 54.7803H177.913V78.8779H163.41V0.783813H193.755C212.721 0.783813 224.547 11.1592 224.547 27.7821C224.547 38.9384 219.192 47.3056 209.932 51.545ZM193.755 13.2789H177.913V42.2853H193.755C203.35 42.2853 209.039 37.488 209.039 27.7821C209.039 18.0761 203.35 13.2789 193.755 13.2789Z" fill={color}/>
    <path d="M157.524 78.9895H141.57L134.319 58.7966H105.424L98.1723 78.9895H82.2188L111.671 0.783813H128.071L157.524 78.9895ZM119.927 18.2992L109.663 46.8593H130.079L119.927 18.2992Z" fill={color}/>
    <path d="M61.4712 0.783813H75.9744V78.8779H61.4712V37.7112L46.2986 78.8779H29.6758L14.5032 37.7112V78.8779H0V0.783813H14.5032L38.043 65.2672L61.4712 0.783813Z" fill={color}/>
  </svg>
);

// ─── M Icon ───────────────────────────────────────────────────────────────────
const MIcon = ({ size = 28 }) => (
  <svg width={size} height={size * 106/114} viewBox="0 0 114 106" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M113.771 105.114H0L4.02732 0H48.6632L56.55 47.1529H58.0602L65.7792 0H109.912L113.771 105.114Z" fill={C.yellow}/>
  </svg>
);

// ─── M Round Logo ─────────────────────────────────────────────────────────────
const MRound = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 277 277" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="276.479" height="276.479" rx="138.24" fill="#F5F5F5"/>
    <path d="M205.984 200.829H70.498L75.294 75.6519H128.449L137.841 131.805H139.64L148.832 75.6519H201.388L205.984 200.829Z" fill="#1A1414"/>
  </svg>
);

// ─── Header Logo (Group_58) ───────────────────────────────────────────────────
const HeaderLogo = ({ height = 28 }) => (
  <svg height={height} viewBox="0 0 614 134" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M65.3759 33.9059H79.8791V112H65.3759V70.8332L50.2034 112H33.5805L18.4079 70.8332V112H3.90471V33.9059H18.4079L41.9477 98.3893L65.3759 33.9059Z" fill="#F5F5F5"/>
    <path d="M191.492 25.7812L191.492 115.224L108.855 112.058L108.855 76.9667L145.925 70.7664L145.925 69.5791L108.855 63.5107L108.855 28.8154L191.492 25.7812Z" fill="#F5F5F5"/>
    <path d="M601.721 115.184L190.785 115.184L190.786 25.7812H597.904L601.721 115.184Z" fill="#F5F5F5"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const projectTypes  = ["Identité visuelle","Logo","Refonte de marque","Charte graphique","Campagne","Site web","Motion design","Autre"];
const valuesList    = ["Authenticité","Innovation","Accessibilité","Excellence","Durabilité","Communauté","Liberté","Impact","Confiance","Créativité"];
const toneList      = ["Direct & tranchant","Chaleureux & humain","Premium & sobre","Ludique & décalé","Expert & rassurant","Militant & engagé"];
const budgetList    = ["< 500€","500 – 1500€","1500 – 5000€","5000€+","Non défini"];
const deadlineList  = ["Urgent (< 1 semaine)","2 – 4 semaines","1 – 2 mois","Flexible"];
const livrablesList = ["Logo principal","Variantes logo","Palette couleurs","Charte typographique","Guide d'usage","Moodboard","Templates réseaux","Papeterie","Packaging","Motion intro"];

// ─── UI Primitives ────────────────────────────────────────────────────────────
const Label = ({ children, dim }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: dim ? C.muted : C.dim, marginBottom: 10, fontFamily: "inherit" }}>
    {children}
  </div>
);

const Chip = ({ label, selected, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 12px", borderRadius: 8, wordBreak: "break-word",
    border: `1px solid ${selected ? C.white : C.border}`,
    background: selected ? C.white : "transparent",
    color: selected ? C.black : C.dim,
    fontWeight: selected ? 600 : 400, fontSize: 12,
    cursor: "pointer", fontFamily: "inherit",
    letterSpacing: "0.3px",
    transition: "all 0.15s",
  }}>{label}</button>
);

const Field = ({ label, error, children, hint }) => (
  <div style={{ marginBottom: 24 }}>
    <Label>{label}</Label>
    {hint && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, lineHeight: 1.5 }}>{hint}</div>}
    {children}
    {error && <div style={{ fontSize: 11, color: C.err, marginTop: 6, letterSpacing: "0.3px" }}>↑ {error}</div>}
  </div>
);

const MInput = ({ value, onChange, placeholder, error }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{
      width: "100%", maxWidth: "100%", background: "transparent", border: `1px solid ${error ? C.err : C.border}`,
      borderRadius: 10, color: C.white, fontFamily: "inherit", fontSize: 14,
      padding: "12px 16px", outline: "none", boxSizing: "border-box",
      transition: "border-color 0.15s",
    }}
  />
);

const MTextarea = ({ value, onChange, placeholder, error }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
    style={{
      width: "100%", maxWidth: "100%", background: "transparent", border: `1px solid ${error ? C.err : C.border}`,
      borderRadius: 10, color: C.white, fontFamily: "inherit", fontSize: 14,
      padding: "12px 16px", outline: "none", resize: "vertical", boxSizing: "border-box",
    }}
  />
);

const BtnPrimary = ({ onClick, children, disabled }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled ? C.gray2 : hovered ? C.white : C.gray3,
        color: disabled ? C.muted : hovered ? C.black : C.white,
        border: "none",
        borderRadius: 12, padding: "12px 28px",
        fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1, transition: "all 0.15s",
      }}>{children}</button>
  );
};

const StarIcon = ({ size = 14, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", flexShrink: 0 }}>
    <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6Z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BtnGenerate = ({ onClick, disabled }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        background: disabled ? C.gray3 : hovered ? "#DEFF7A" : "#CEF563",
        color: disabled ? C.muted : C.black,
        border: "none",
        borderRadius: 100,
        padding: "7px 7px 7px 18px",
        fontFamily: "inherit", fontSize: 12, fontWeight: 800,
        letterSpacing: "0.3px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex", alignItems: "center", gap: 8,
        transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
        transform: pressed && !disabled ? "scale(0.97)" : hovered && !disabled ? "scale(1.03)" : "scale(1)",
        boxShadow: !disabled && !hovered ? "0 0 24px rgba(206,245,99,0.45)" : "none",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>Générer le brief</span>

      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 26, height: 26, borderRadius: "50%",
        background: hovered ? "#DEFF7A" : "#CEF563", color: C.black, flexShrink: 0,
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered && !disabled ? "translate(2px, -2px)" : "translate(0, 0)",
      }}>
        <ArrowIcon />
      </span>
    </button>
  );
};

const LoadingScreen = () => {
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState("Lecture des inputs…");
  useEffect(() => {
    const steps = [
      { target: 28, label: "Lecture des inputs…",        delay: 0 },
      { target: 57, label: "Analyse du positionnement…", delay: 900 },
      { target: 81, label: "Structuration du brief…",    delay: 1900 },
      { target: 96, label: "Finalisation…",              delay: 3000 },
    ];
    const timers = steps.map(({ target, label, delay }) => {
      const t = setTimeout(() => {
        setLabel(label);
        let current = 0;
        const step = () => {
          setPct(prev => {
            if (prev >= target) return prev;
            const next = prev + 1;
            if (next < target) requestAnimationFrame(step);
            return next;
          });
        };
        requestAnimationFrame(step);
      }, delay);
      return t;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ padding: "60px 0 40px" }}>
      {/* Big percentage */}
      <div style={{
        fontSize: 88, fontWeight: 700, letterSpacing: "-4px", lineHeight: 1,
        color: C.yellow, fontVariantNumeric: "tabular-nums",
        marginBottom: 32,
      }}>
        {String(pct).padStart(2, "0")}<span style={{ fontSize: 40, letterSpacing: "-2px", color: C.muted }}>%</span>
      </div>

      {/* Label */}
      <div style={{
        fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
        color: C.muted, marginBottom: 24, fontWeight: 500,
      }}>{label}</div>

      {/* Bar */}
      <div style={{ height: 1, background: C.border, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, background: C.yellow,
          transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }} />
      </div>
    </div>
  );
};

const BtnGhost = ({ onClick, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#2e2525" : C.gray1,
        color: hovered ? C.white : C.muted,
        border: "none",
        borderRadius: 12, padding: "12px 22px", fontFamily: "inherit", fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.3px", cursor: "pointer",
        transition: "all 0.15s",
      }}>{children}</button>
  );
};

const Divider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "32px 0" }}>
    {label && <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.muted, whiteSpace: "nowrap" }}>{label}</div>}
    <div style={{ flex: 1, height: 1, background: C.border }} />
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BriefGenerator() {
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [brief, setBrief]     = useState(null);
  const [copied, setCopied]   = useState(false);
  const [errors, setErrors]   = useState({});

  const [clientName, setClientName]   = useState("");
  const [brandName, setBrandName]     = useState("");
  const [projectType, setProjectType] = useState([]);
  const [projectDesc, setProjectDesc] = useState("");
  const [target, setTarget]           = useState("");
  const [targetNeeds, setTargetNeeds] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [values, setValues]           = useState([]);
  const [tone, setTone]               = useState([]);
  const [antiPos, setAntiPos]         = useState("");
  const [inspirations, setInspirations] = useState("");
  const [toAvoid, setToAvoid]         = useState("");
  const [livrables, setLivrables]     = useState([]);
  const [budget, setBudget]           = useState("");
  const [deadline, setDeadline]       = useState("");
  const [constraints, setConstraints] = useState("");

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("mq_draft") || "{}");
      if (d.brandName)    setBrandName(d.brandName);
      if (d.clientName)   setClientName(d.clientName);
      if (d.projectDesc)  setProjectDesc(d.projectDesc);
      if (d.target)       setTarget(d.target);
      if (d.targetNeeds)  setTargetNeeds(d.targetNeeds);
      if (d.competitors)  setCompetitors(d.competitors);
      if (d.antiPos)      setAntiPos(d.antiPos);
      if (d.inspirations) setInspirations(d.inspirations);
      if (d.toAvoid)      setToAvoid(d.toAvoid);
      if (d.constraints)  setConstraints(d.constraints);
      if (d.projectType)  setProjectType(d.projectType);
      if (d.values)       setValues(d.values);
      if (d.tone)         setTone(d.tone);
      if (d.livrables)    setLivrables(d.livrables);
      if (d.budget)       setBudget(d.budget);
      if (d.deadline)     setDeadline(d.deadline);
    } catch(e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("mq_draft", JSON.stringify({ clientName, brandName, projectType, projectDesc, target, targetNeeds, competitors, values, tone, antiPos, inspirations, toAvoid, livrables, budget, deadline, constraints })); }
    catch(e) {}
  }, [clientName, brandName, projectType, projectDesc, target, targetNeeds, competitors, values, tone, antiPos, inspirations, toAvoid, livrables, budget, deadline, constraints]);

  const toggleArr  = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const toggleOne  = (set, cur, v) => set(cur === v ? "" : v);

  function validate(s) {
    const e = {};
    if (s === 0) {
      if (!brandName.trim())   e.brandName   = "Requis";
      if (!projectDesc.trim()) e.projectDesc = "Requis";
      if (!projectType.length) e.projectType = "Sélectionne au moins un type";
    }
    if (s === 1) {
      if (!target.trim())      e.target      = "Requis";
      if (!targetNeeds.trim()) e.targetNeeds = "Requis";
    }
    if (s === 2) {
      if (!values.length) e.values = "Sélectionne au moins une valeur";
      if (!tone.length)   e.tone   = "Sélectionne au moins un ton";
    }
    if (s === 4 && !livrables.length) e.livrables = "Sélectionne au moins un livrable";
    if (s === 5) {
      if (!budget)   e.budget   = "Requis";
      if (!deadline) e.deadline = "Requis";
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  const nextStep = s => { if (validate(s)) { setErrors({}); setStep(s + 1); window.scrollTo(0,0); }};
  const prevStep = s => { setErrors({}); setStep(s - 1); window.scrollTo(0,0); };

  async function generate() {
    if (!validate(5)) return;
    const raw = {
      projet:         `${brandName} — ${projectType.join(', ')}. ${projectDesc}`,
      cible:          `${target}. ${targetNeeds}`,
      concurrents:    competitors || "Non renseigné",
      positionnement: `Valeurs : ${values.join(', ')}. Ton : ${tone.join(', ')}. À éviter : ${antiPos || 'Non précisé'}.`,
      inspirations:   inspirations || "Non renseigné",
      a_eviter:       toAvoid || "Non renseigné",
      livrables:      livrables.join(', '),
      cadre:          `Budget : ${budget}. Délai : ${deadline}${constraints ? '. ' + constraints : ''}.`,
    };
    setLoading(true); setErrors({});

    const prompt = `Tu es un directeur artistique senior chargé de rédiger un brief créatif final à partir d'inputs bruts client.

PHILOSOPHIE DU BRIEF :
- Le brief est un outil contractuel entre client et designer. Il engage les deux parties.
- Il doit permettre à un designer de travailler sans revenir poser des questions.
- Traduis sans trahir : reste fidèle à l'intention du client. Pas de sur-interprétation.
- Détecte les non-dits : formule ce que le client n'a pas su dire clairement.
- Le brief commence par une compréhension partagée, pas par une réponse graphique.
- Chaque section = 2-3 phrases max. Dense, factuel, zéro adjectif creux.
- Chaque mot doit guider une décision créative concrète.
- message_cle = boussole interne. 1 phrase. Pas un slogan. Pas du marketing.

BRIEF BRUT CLIENT :
Projet : ${raw.projet}
Cible : ${raw.cible}
Concurrents : ${raw.concurrents}
Positionnement : ${raw.positionnement}
Inspirations : ${raw.inspirations}
À éviter : ${raw.a_eviter}
Livrables : ${raw.livrables}
Cadre : ${raw.cadre}

JSON attendu avec ces 7 clés exactes :
{
  "projet": "Contexte, enjeu réel et raison d'être du projet. Ce que ce design doit résoudre. 2-3 phrases.",
  "cible": "Portrait précis de la cible, sa tension principale, ce qu'elle cherche sans le trouver. 2 phrases.",
  "positionnement": "Ce que la marque est, ce qu'elle n'est absolument pas, sa promesse différenciante. 2 phrases tranchées.",
  "direction_creative": "Univers visuel, registre émotionnel, 2 pistes concrètes traduisibles en choix graphiques immédiats. 3 phrases max.",
  "references": "Ce que les références autorisent comme direction, ce que les anti-références interdisent. 2 phrases.",
  "livrables_cadre": "Liste des livrables, budget, délai, contraintes bloquantes. Factuel. 2 phrases.",
  "message_cle": "1 phrase interne courte. La boussole de toutes les décisions créatives."
}

Réponds UNIQUEMENT avec le JSON valide, sans backticks.`;

    try {
      const res  = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data   = await res.json();
      const text   = data.content.map(i => i.text || "").join("").trim();
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setBrief({ raw, comments: parsed, client: clientName, brand: brandName, date: new Date().toLocaleDateString('fr-FR') });
      try { localStorage.removeItem("mq_draft"); } catch(e) {}
    } catch(err) {
      setErrors({ api: "Erreur de génération. Vérifie ta connexion et réessaie." });
    }
    setLoading(false);
  }

  function exportPDF() {
    if (!brief) return;
    const { raw, comments, brand, client, date } = brief;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, H = 297, mX = 20, colW = 210 - 40;

    const WHITE  = [255,255,255], BLACK = [18,14,14], MUTED = [160,150,150];
    const LGRAY  = [245,245,245], DGRAY = [200,195,195];
    const GREEN  = [206,245,99],  DKGRN = [55,85,10];

    const bg = () => { doc.setFillColor(...WHITE); doc.rect(0,0,W,H,"F"); };

    const drawHeader = () => {
      doc.setFontSize(7); doc.setFont("helvetica","normal");
      doc.setTextColor(...MUTED);
      doc.text("BRIEF CRÉATIF — MARQUEUR", mX, 14);
      const brandStr = (brand||"") + (client ? " / "+client : "");
      doc.setFontSize(22); doc.setFont("helvetica","bold");
      doc.setTextColor(...BLACK);
      doc.text(brandStr.toUpperCase(), mX, 24);
      doc.setFontSize(7); doc.setFont("helvetica","normal");
      doc.setTextColor(...MUTED);
      doc.text(date, mX, 31);
      doc.setDrawColor(...DGRAY); doc.setLineWidth(0.4);
      doc.line(mX, 36, W-mX, 36);
      return 46;
    };

    const sectionLabel = (label, y) => {
      doc.setFontSize(7); doc.setFont("helvetica","bold");
      doc.setTextColor(...MUTED); doc.setCharSpace(1.2);
      doc.text(label.toUpperCase(), mX, y);
      doc.setCharSpace(0);
    };

    const drawSection = (label, body, y) => {
      if (!body || !body.trim()) return y;
      const lines = doc.splitTextToSize(String(body), colW);
      const totalH = 3.5 + lines.length * 5.0 + 7;
      if (y + totalH > H - 18) return null;
      sectionLabel(label, y);
      y += 3.5;
      doc.setFontSize(9.5); doc.setFont("helvetica","normal");
      doc.setTextColor(...BLACK);
      lines.forEach(l => { doc.text(l, mX, y); y += 5.0; });
      return y + 7;
    };

    const footer = () => {
      doc.setFontSize(7); doc.setFont("helvetica","normal");
      doc.setTextColor(...MUTED);
      doc.text("Généré par MARQUEUR Brief Generator", mX, H-8);
      doc.text("marqueur.design", W-mX, H-8, { align:"right" });
    };

    // ── PAGE 1 : Réponses client ────────────────────────────────────────────
    bg();
    let y = drawHeader();

    // Titre
    doc.setFontSize(8); doc.setFont("helvetica","bold");
    doc.setTextColor(...MUTED); doc.setCharSpace(1.2);
    doc.text("RÉPONSES CLIENT", mX, y);
    doc.setCharSpace(0);
    y += 5;

    // Calcul hauteur totale du bloc gris
    const rawFields = [
      ["Projet & description",          raw.projet],
      ["Cible & besoins",               raw.cible],
      ["Concurrents",                   raw.concurrents],
      ["Valeurs, ton & positionnement", raw.positionnement],
      ["Références & inspirations",     raw.inspirations],
      ["À éviter",                      raw.a_eviter],
      ["Livrables",                     raw.livrables],
      ["Budget, délai & contraintes",   raw.cadre],
    ].filter(([,v]) => v && v.trim());

    const pad = 6;
    const lineH = 5.0;
    const labelH = 3.5;
    const gapH = 6;

    let totalInner = 0;
    rawFields.forEach(([,body]) => {
      const lines = doc.splitTextToSize(String(body), colW - 8);
      totalInner += labelH + lines.length * lineH + gapH;
    });
    totalInner -= gapH; // no trailing gap after last
    const blockH = totalInner + pad * 2 + 2;

    // Bloc gris
    doc.setFillColor(...LGRAY);
    doc.roundedRect(mX-4, y, colW+8, blockH, 4, 4, "F");

    // Contenu dans le bloc
    let cy = y + pad + 2;
    rawFields.forEach(([label, body], i) => {
      const lines = doc.splitTextToSize(String(body), colW - 8);
      const iX = mX + 1;
      doc.setFontSize(6.5); doc.setFont("helvetica","bold");
      doc.setTextColor(...MUTED); doc.setCharSpace(1.2);
      doc.text(label.toUpperCase(), iX, cy); doc.setCharSpace(0);
      cy += labelH;
      doc.setFontSize(9.5); doc.setFont("helvetica","normal");
      doc.setTextColor(...BLACK);
      lines.forEach(l => { doc.text(l, iX, cy); cy += lineH; });
      if (i < rawFields.length - 1) cy += gapH;
    });

    footer();
    doc.addPage();

    // ── PAGE 2 : Brief IA ───────────────────────────────────────────────────
    bg();
    y = drawHeader();

    // Titre
    doc.setFontSize(8); doc.setFont("helvetica","bold");
    doc.setTextColor(...MUTED); doc.setCharSpace(1.2);
    doc.text("BRIEF GÉNÉRÉ PAR L'IA", mX, y);
    doc.setCharSpace(0);
    y += 8;

    const aiFields = [
      ["Projet",             comments.projet],
      ["Cible",              comments.cible],
      ["Positionnement",     comments.positionnement],
      ["Direction créative", comments.direction_creative],
      ["Références",         comments.references],
      ["Livrables & cadre",  comments.livrables_cadre],
    ];

    for (const [label, body] of aiFields) {
      const result = drawSection(label, body, y);
      if (result === null) {
        footer(); doc.addPage(); bg();
        y = drawHeader() + 8;
        y = drawSection(label, body, y);
      } else {
        y = result;
      }
    }

    // Message clé
    y += 4;
    checkY(40);
    doc.setFontSize(14); doc.setFont("helvetica","bold");
    const msgLines = doc.splitTextToSize(String(comments.message_cle||""), colW - 4);
    const msgH = msgLines.length * 7 + 16;
    doc.setFillColor(...GREEN);
    doc.roundedRect(mX-4, y, colW+8, msgH, 2, 2, "F");
    doc.setFontSize(7); doc.setFont("helvetica","bold");
    doc.setTextColor(...DKGRN); doc.setCharSpace(1.2);
    doc.text("MESSAGE CLÉ", mX, y+5); doc.setCharSpace(0);
    doc.setFontSize(14); doc.setFont("helvetica","bold");
    doc.setTextColor(...BLACK);
    let ty = y + 13;
    msgLines.forEach(l => { doc.text(l, mX, ty); ty += 7; });

    footer();
    const filename = `Brief_${(brand||"Marqueur").replace(/\s+/g,"_")}.pdf`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } else {
      doc.save(filename);
    }
  }


  async function copyBrief() {
    if (!brief) return;
    const { raw, comments, brand, client, date } = brief;
    const sep = '─'.repeat(44);
    let t = `BRIEF CRÉATIF — MARQUEUR\n`;
    t += `${brand}${client ? ' / '+client : ''} — ${date}\n`;
    t += `${sep}\n`;
    t += `RÉPONSES CLIENT\n`;
    t += `${sep}\n\n`;
    if (raw.projet)        t += `Projet : ${raw.projet}\n\n`;
    if (raw.cible)         t += `Cible : ${raw.cible}\n\n`;
    if (raw.concurrents)   t += `Concurrents : ${raw.concurrents}\n\n`;
    if (raw.positionnement) t += `Positionnement : ${raw.positionnement}\n\n`;
    if (raw.inspirations)  t += `Inspirations : ${raw.inspirations}\n\n`;
    if (raw.a_eviter)      t += `À éviter : ${raw.a_eviter}\n\n`;
    if (raw.livrables)     t += `Livrables : ${raw.livrables}\n\n`;
    if (raw.cadre)         t += `Cadre : ${raw.cadre}\n\n`;
    t += `${sep}\n`;
    t += `BRIEF INTERPRÉTÉ PAR L'IA\n`;
    t += `${sep}\n\n`;
    t += `PROJET\n${comments.projet}\n\n`;
    t += `CIBLE\n${comments.cible}\n\n`;
    t += `POSITIONNEMENT\n${comments.positionnement}\n\n`;
    t += `DIRECTION CRÉATIVE\n${comments.direction_creative}\n\n`;
    t += `RÉFÉRENCES\n${comments.references}\n\n`;
    t += `LIVRABLES & CADRE\n${comments.livrables_cadre}\n\n`;
    t += `MESSAGE CLÉ\n${comments.message_cle}\n\n`;
    t += `Généré par MARQUEUR Brief Generator — marqueur.design`;

    const fallback = () => {
      const el = document.createElement("textarea");
      el.value = t;
      el.setAttribute("readonly", "");
      el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
      document.body.appendChild(el);
      el.focus();
      el.setSelectionRange(0, el.value.length);
      try { document.execCommand("copy"); } catch(e) {}
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(t);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        fallback();
      }
    } catch {
      fallback();
    }
  }

  function reset() {
    setStep(0); setBrief(null); setErrors({});
    setBrandName(""); setClientName(""); setProjectType([]); setProjectDesc("");
    setTarget(""); setTargetNeeds(""); setCompetitors(""); setValues([]); setTone([]);
    setAntiPos(""); setInspirations(""); setToAvoid(""); setLivrables([]);
    setBudget(""); setDeadline(""); setConstraints("");
    try { localStorage.removeItem("mq_draft"); } catch(e) {}
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: C.black, minHeight: "100vh", color: C.white }}>
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #3d3535; }
        input:focus, textarea:focus { border-color: #F5F5F5 !important; outline: none; }
        textarea:focus { border-color: #F5F5F5 !important; outline: none; }
        @keyframes prog { 0%{width:4%} 60%{width:75%} 100%{width:96%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="no-print" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 40px", height: 56, borderBottom: `1px solid ${C.border}`,
        position: "sticky", top: 0, background: C.black, zIndex: 100,
      }}>
        <HeaderLogo height={24} />
      </header>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px 100px", boxSizing: "border-box", overflowX: "hidden" }}>

        {/* ── LOADING ── */}
        {loading && (
          <div className="fade-up" style={{ padding: "80px 0", textAlign: "center" }}>
            <div style={{ height: 1, background: C.gray3, overflow: "hidden", marginBottom: 32 }}>
              <div style={{ height: "100%", background: C.yellow, animation: "prog 2.5s ease-in-out infinite" }} />
            </div>
            <MIcon size={32} />
            <div style={{ marginTop: 16, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.muted }}>Analyse en cours</div>
          </div>
        )}

        {/* ── BRIEF RESULT ── */}
        {brief && !loading && (
          <div className="fade-up">
            {/* Result header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>Brief créatif</div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1 }}>{brief.brand}</div>
                {brief.client && <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{brief.client}</div>}
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{brief.date}</div>
              </div>
              <div className="no-print" style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={copyBrief} style={{ padding: "9px 16px", borderRadius: 2, background: C.gray2, color: C.white, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.5px" }}>
                  {copied ? "✓ Copié" : "Copier"}
                </button>
                <button onClick={() => exportPDF()} style={{ padding: "9px 16px", borderRadius: 10, background: C.yellow, color: C.black, border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.5px" }}>
                  Export PDF
                </button>
              </div>
            </div>

            {/* Raw inputs */}
            <div style={{ background: C.gray1, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <Label dim>Inputs client</Label>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  ["Projet", brief.raw.projet],
                  ["Cible", brief.raw.cible],
                  ["Concurrents", brief.raw.concurrents],
                  ["Positionnement", brief.raw.positionnement],
                  ["Inspirations", brief.raw.inspirations],
                  ["À éviter", brief.raw.a_eviter],
                  ["Livrables", brief.raw.livrables],
                  ["Cadre", brief.raw.cadre],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 12, fontSize: 12 }}>
                    <div style={{ color: C.muted, paddingTop: 1 }}>{lbl}</div>
                    <div style={{ color: C.white, lineHeight: 1.55 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <Divider label="Brief structuré" />

            {/* Brief sections */}
            {[
              ["Projet",            brief.comments.projet],
              ["Cible",             brief.comments.cible],
              ["Positionnement",    brief.comments.positionnement],
              ["Direction créative",brief.comments.direction_creative],
              ["Références",        brief.comments.references],
              ["Livrables & Cadre", brief.comments.livrables_cadre],
            ].map(([lbl, val]) => (
              <div key={lbl} style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 0" }}>
                <Label dim>{lbl}</Label>
                <div style={{ fontSize: 14, color: C.white, lineHeight: 1.7 }}>{val}</div>
              </div>
            ))}

            {/* Message clé */}
            <div style={{ background: C.yellow, padding: "20px 24px", margin: "24px 0 0", borderRadius: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#666", marginBottom: 8 }}>Message clé</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.black, lineHeight: 1.4, letterSpacing: "-0.2px" }}>{brief.comments.message_cle}</div>
            </div>

            {/* CTA */}
            <div className="no-print" style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 6 }}>Tu veux aller plus loin ?</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 18, lineHeight: 1.65 }}>Ce brief est un point de départ. Pour valider ta direction créative ou démarrer une identité complète.</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="https://ionian-handball-f23.notion.site/Marqueur-Mini-Conseil-22af125382be8093b6f6e60197e4b848" target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 2, background: C.yellow, color: C.black, fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: "0.5px", textTransform: "uppercase" }}>Mini Conseil — 50€ →</a>
                <a href="https://www.tiktok.com/@marqueurdesign" target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 2, background: "transparent", color: C.white, border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 600, textDecoration: "none", letterSpacing: "0.5px" }}>@marqueurdesign</a>
              </div>
            </div>

            <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
              <button onClick={reset} style={{ background: "none", border: "none", color: C.muted, fontSize: 11, cursor: "pointer", letterSpacing: "0.5px", fontFamily: "inherit" }}>← Nouveau brief</button>
              <MarqueurLogo height={12} color={C.muted} />
            </div>
          </div>
        )}

        {/* ── FORM ── */}
        {!brief && !loading && (
          <div className="fade-up">

            {/* Hero */}
            {step === 0 && (
              <div style={{ marginBottom: 52 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px", lineHeight: 1.05, marginBottom: 6 }}>
                    BRIEF GENERATOR
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                    Réponds en langage naturel — l'IA structure et analyse en brief professionnel.
                  </div>
                </div>

              </div>
            )}

            {/* Progress */}
            <div className="no-print" style={{ display: "flex", gap: 4, marginBottom: 40 }}>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ flex: 1, height: 2, borderRadius: 0, background: i <= step ? C.yellow : C.border, transition: "background 0.3s" }} />
              ))}
            </div>

            {/* Step label */}
            <div style={{ fontSize: 9, letterSpacing: "2.5px", textTransform: "uppercase", color: C.muted, marginBottom: 6 }}>
              Étape {step + 1} / 6
            </div>

            {/* ── Step 0 ── */}
            {step === 0 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Le projet</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>Qu'est-ce qu'on crée ?</div>

              <Field label="Nom du client (optionnel)">
                <MInput value={clientName} onChange={setClientName} placeholder="Marie Dupont, Studio Nova..." />
              </Field>
              <Field label="Nom de la marque *" error={errors.brandName}>
                <MInput value={brandName} onChange={setBrandName} placeholder="Yogaga, Café Volt, Clara D..." error={errors.brandName} />
              </Field>
              <Field label="Type de projet *" error={errors.projectType}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {projectTypes.map(t => <Chip key={t} label={t} selected={projectType.includes(t)} onClick={() => toggleArr(projectType, setProjectType, t)} />)}
                </div>
              </Field>
              <Field label="Décris le projet *" error={errors.projectDesc}>
                <MTextarea value={projectDesc} onChange={setProjectDesc} placeholder="Ce qu'est la marque, ce qu'elle fait, pourquoi ce projet maintenant..." error={errors.projectDesc} />
              </Field>
              <BtnPrimary onClick={() => nextStep(0)}>Suivant</BtnPrimary>
            </>}

            {/* ── Step 1 ── */}
            {step === 1 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>La cible</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>À qui on parle ?</div>

              <Field label="Décris ta cible *" error={errors.target}>
                <MInput value={target} onChange={setTarget} placeholder="Couples 28–45, freelances créatifs, PME locales..." error={errors.target} />
              </Field>
              <Field label="Ses frustrations / besoins *" error={errors.targetNeeds}>
                <MTextarea value={targetNeeds} onChange={setTargetNeeds} placeholder="Ce qui l'énerve, ce qu'elle cherche sans trouver..." error={errors.targetNeeds} />
              </Field>
              <Field label="Concurrents directs (optionnel)">
                <MInput value={competitors} onChange={setCompetitors} placeholder="Yanaï Yoga, Studio Flow, Be Yoga Paris..." />
              </Field>
              <div style={{ display: "flex", gap: 10 }}>
                <BtnGhost onClick={() => prevStep(1)}>Retour</BtnGhost>
                <BtnPrimary onClick={() => nextStep(1)}>Suivant</BtnPrimary>
              </div>
            </>}

            {/* ── Step 2 ── */}
            {step === 2 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Le positionnement</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>Comment la marque veut être perçue ?</div>

              <Field label="Valeurs *" error={errors.values}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {valuesList.map(v => <Chip key={v} label={v} selected={values.includes(v)} onClick={() => toggleArr(values, setValues, v)} />)}
                </div>
              </Field>
              <Field label="Ton de communication *" error={errors.tone}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {toneList.map(t => <Chip key={t} label={t} selected={tone.includes(t)} onClick={() => toggleArr(tone, setTone, t)} />)}
                </div>
              </Field>
              <Field label="Ce que la marque n'est PAS">
                <MInput value={antiPos} onChange={setAntiPos} placeholder="pas corporate, pas agressif, pas générique..." />
              </Field>
              <div style={{ display: "flex", gap: 10 }}>
                <BtnGhost onClick={() => prevStep(2)}>Retour</BtnGhost>
                <BtnPrimary onClick={() => nextStep(2)}>Suivant</BtnPrimary>
              </div>
            </>}

            {/* ── Step 3 ── */}
            {step === 3 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Les références</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>Ce qui inspire, ce qui repousse.</div>

              <Field label="Ce qui inspire">
                <MTextarea value={inspirations} onChange={setInspirations} placeholder="Jacquemus pour la légèreté, Notion pour la clarté, Loewe pour le raffinement..." />
              </Field>
              <Field label="Ce qu'il faut éviter">
                <MTextarea value={toAvoid} onChange={setToAvoid} placeholder="trop sombre, trop chargé, clichés du bien-être..." />
              </Field>
              <div style={{ display: "flex", gap: 10 }}>
                <BtnGhost onClick={() => prevStep(3)}>Retour</BtnGhost>
                <BtnPrimary onClick={() => nextStep(3)}>Suivant</BtnPrimary>
              </div>
            </>}

            {/* ── Step 4 ── */}
            {step === 4 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Les livrables</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>Ce qui doit être produit.</div>

              <Field label="Livrables attendus *" error={errors.livrables}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {livrablesList.map(l => <Chip key={l} label={l} selected={livrables.includes(l)} onClick={() => toggleArr(livrables, setLivrables, l)} />)}
                </div>
              </Field>
              <div style={{ display: "flex", gap: 10 }}>
                <BtnGhost onClick={() => prevStep(4)}>Retour</BtnGhost>
                <BtnPrimary onClick={() => nextStep(4)}>Suivant</BtnPrimary>
              </div>
            </>}

            {/* ── Step 5 ── */}
            {step === 5 && <>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>Le cadre</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>Budget, délai, contraintes.</div>

              <Field label="Budget *" error={errors.budget}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {budgetList.map(b => <Chip key={b} label={b} selected={budget === b} onClick={() => toggleOne(setBudget, budget, b)} />)}
                </div>
              </Field>
              <Field label="Délai *" error={errors.deadline}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, rowGap: 10 }}>
                  {deadlineList.map(d => <Chip key={d} label={d} selected={deadline === d} onClick={() => toggleOne(setDeadline, deadline, d)} />)}
                </div>
              </Field>
              <Field label="Contraintes spécifiques">
                <MTextarea value={constraints} onChange={setConstraints} placeholder="logo existant à conserver, formats obligatoires..." />
              </Field>

              {errors.api && (
                <div style={{ background: "#1a0808", border: `1px solid ${C.err}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: C.err, fontSize: 12 }}>
                  {errors.api}
                </div>
              )}
              <div style={{ display: "flex", gap: 20, alignItems: "center", marginTop: 8 }}>
                <BtnGhost onClick={() => prevStep(5)}>Retour</BtnGhost>
                <BtnGenerate onClick={generate} />
              </div>
            </>}
          </div>
        )}
      </div>
    </div>
  );
}
