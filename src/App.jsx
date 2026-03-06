import { useState, useEffect } from "react";

const ACCENT = "#E8FF47";
const BLACK = "#0a0a0a";
const GRAY = "#1a1a1a";
const GRAY2 = "#2a2a2a";
const GRAY3 = "#666";
const WHITE = "#f5f4f0";
const BORDER = "#2a2a2a";
const ERR = "#ff6b6b";

const projectTypes = ["Identité visuelle","Logo","Refonte de marque","Charte graphique","Campagne","Site web","Motion design","Autre"];
const valuesList = ["Authenticité","Innovation","Accessibilité","Excellence","Durabilité","Communauté","Liberté","Impact","Confiance","Créativité"];
const toneList = ["Direct & tranchant","Chaleureux & humain","Premium & sobre","Ludique & décalé","Expert & rassurant","Militant & engagé"];
const budgetList = ["< 500€","500 – 1500€","1500 – 5000€","5000€+","Non défini"];
const deadlineList = ["Urgent (< 1 semaine)","2 – 4 semaines","1 – 2 mois","Flexible"];
const livrablesList = ["Logo principal","Variantes logo","Palette couleurs","Charte typographique","Guide d'usage","Moodboard","Templates réseaux","Papeterie","Packaging","Motion intro"];

function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 100,
      border: `1px solid ${selected ? ACCENT : BORDER}`,
      background: selected ? ACCENT : "transparent",
      color: selected ? BLACK : GRAY3,
      fontWeight: selected ? 700 : 400, fontSize: 13,
      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
    }}>{label}</button>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: GRAY3, marginBottom: 8 }}>{label}</div>
      {children}
      {error && <div style={{ fontSize: 12, color: ERR, marginTop: 5 }}>⚠ {error}</div>}
    </div>
  );
}

function Input({ value, onChange, placeholder, error }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", background: GRAY, border: `1px solid ${error ? ERR : BORDER}`, borderRadius: 8, color: WHITE, fontFamily: "inherit", fontSize: 15, padding: "13px 16px", outline: "none", boxSizing: "border-box" }}
    />
  );
}

function Textarea({ value, onChange, placeholder, error }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
      style={{ width: "100%", background: GRAY, border: `1px solid ${error ? ERR : BORDER}`, borderRadius: 8, color: WHITE, fontFamily: "inherit", fontSize: 15, padding: "13px 16px", outline: "none", resize: "vertical", boxSizing: "border-box" }}
    />
  );
}

function BtnPrimary({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: disabled ? GRAY2 : ACCENT, color: disabled ? GRAY3 : BLACK, border: "none", borderRadius: 8, padding: "13px 26px", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );
}

function BtnSecondary({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: "transparent", color: GRAY3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "13px 22px", fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>
      {children}
    </button>
  );
}

export default function BriefGenerator() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const [clientName, setClientName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [projectType, setProjectType] = useState([]);
  const [projectDesc, setProjectDesc] = useState("");
  const [target, setTarget] = useState("");
  const [targetNeeds, setTargetNeeds] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [values, setValues] = useState([]);
  const [tone, setTone] = useState([]);
  const [antiPos, setAntiPos] = useState("");
  const [inspirations, setInspirations] = useState("");
  const [toAvoid, setToAvoid] = useState("");
  const [livrables, setLivrables] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [constraints, setConstraints] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mq_brief_draft");
      if (saved) {
        const d = JSON.parse(saved);
        if (d.brandName) setBrandName(d.brandName);
        if (d.clientName) setClientName(d.clientName);
        if (d.projectDesc) setProjectDesc(d.projectDesc);
        if (d.target) setTarget(d.target);
        if (d.targetNeeds) setTargetNeeds(d.targetNeeds);
        if (d.competitors) setCompetitors(d.competitors);
        if (d.antiPos) setAntiPos(d.antiPos);
        if (d.inspirations) setInspirations(d.inspirations);
        if (d.toAvoid) setToAvoid(d.toAvoid);
        if (d.constraints) setConstraints(d.constraints);
        if (d.projectType) setProjectType(d.projectType);
        if (d.values) setValues(d.values);
        if (d.tone) setTone(d.tone);
        if (d.livrables) setLivrables(d.livrables);
        if (d.budget) setBudget(d.budget);
        if (d.deadline) setDeadline(d.deadline);
      }
    } catch(e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mq_brief_draft", JSON.stringify({ clientName, brandName, projectType, projectDesc, target, targetNeeds, competitors, values, tone, antiPos, inspirations, toAvoid, livrables, budget, deadline, constraints }));
    } catch(e) {}
  }, [clientName, brandName, projectType, projectDesc, target, targetNeeds, competitors, values, tone, antiPos, inspirations, toAvoid, livrables, budget, deadline, constraints]);

  function toggleArr(arr, setArr, val) {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  }
  function setSingle(setFn, current, val) {
    setFn(current === val ? "" : val);
  }

  function validate(s) {
    const e = {};
    if (s === 0) {
      if (!brandName.trim()) e.brandName = "Requis";
      if (!projectDesc.trim()) e.projectDesc = "Requis";
      if (!projectType.length) e.projectType = "Sélectionne au moins un type";
    }
    if (s === 1) {
      if (!target.trim()) e.target = "Requis";
      if (!targetNeeds.trim()) e.targetNeeds = "Requis";
    }
    if (s === 2) {
      if (!values.length) e.values = "Sélectionne au moins une valeur";
      if (!tone.length) e.tone = "Sélectionne au moins un ton";
    }
    if (s === 4) {
      if (!livrables.length) e.livrables = "Sélectionne au moins un livrable";
    }
    if (s === 5) {
      if (!budget) e.budget = "Requis";
      if (!deadline) e.deadline = "Requis";
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  function nextStep(s) {
    if (!validate(s)) return;
    setErrors({});
    setStep(s + 1);
  }
  function prevStep(s) {
    setErrors({});
    setStep(s - 1);
  }

  async function generateBrief() {
    if (!validate(5)) return;

    const raw = {
      projet: `${brandName} — ${projectType.join(', ')}. ${projectDesc}`,
      cible: `${target}. ${targetNeeds}`,
      concurrents: competitors || "Non renseigné",
      positionnement: `Valeurs : ${values.join(', ')}. Ton : ${tone.join(', ')}. À éviter : ${antiPos || 'Non précisé'}.`,
      inspirations: inspirations || "Non renseigné",
      a_eviter: toAvoid || "Non renseigné",
      livrables: livrables.join(', '),
      cadre: `Budget : ${budget}. Délai : ${deadline}${constraints ? '. ' + constraints : ''}.`,
    };

    setLoading(true);
    setErrors({});

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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("").trim();
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setBrief({ raw, comments: parsed, client: clientName, brand: brandName, date: new Date().toLocaleDateString('fr-FR') });
      try { localStorage.removeItem("mq_brief_draft"); } catch(e) {}
    } catch (err) {
      setErrors({ api: "Erreur de génération. Vérifie ta connexion et réessaie." });
      console.error(err);
    }
    setLoading(false);
  }

  function copyBrief() {
    if (!brief) return;
    const { raw, comments, brand, client, date } = brief;
    let text = `BRIEF CRÉATIF — MARQUEUR\n${brand}${client ? ' / ' + client : ''} — ${date}\n${"─".repeat(44)}\n\n`;
    text += `PROJET\n${comments.projet}\n\n`;
    text += `CIBLE\n${comments.cible}\n\n`;
    text += `POSITIONNEMENT\n${comments.positionnement}\n\n`;
    text += `DIRECTION CRÉATIVE\n${comments.direction_creative}\n\n`;
    text += `RÉFÉRENCES\n${comments.references}\n\n`;
    text += `LIVRABLES & CADRE\n${comments.livrables_cadre}\n\n`;
    text += `MESSAGE CLÉ\n${comments.message_cle}\n\n─────────────────\nGénéré par M.ARQUEUR`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function reset() {
    setStep(0); setBrief(null); setErrors({});
    setClientName(""); setBrandName(""); setProjectType([]); setProjectDesc("");
    setTarget(""); setTargetNeeds(""); setCompetitors(""); setValues([]); setTone([]);
    setAntiPos(""); setInspirations(""); setToAvoid("");
    setLivrables([]); setBudget(""); setDeadline(""); setConstraints("");
    try { localStorage.removeItem("mq_brief_draft"); } catch(e) {}
  }

  const TOTAL_STEPS = 6;

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: BLACK, minHeight: "100vh", color: WHITE }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: BLACK, zIndex: 10 }}>
        <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>M<span style={{ color: ACCENT }}>.</span>ARQUEUR</div>
        <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: GRAY3 }}>Brief Generator</div>
      </div>

      <div style={{ maxWidth: 660, margin: "0 auto", padding: "44px 28px 80px" }}>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ height: 2, background: GRAY2, borderRadius: 2, overflow: "hidden", marginBottom: 24 }}>
              <div style={{ height: "100%", background: ACCENT, borderRadius: 2, animation: "prog 2s ease-in-out infinite" }} />
            </div>
            <div style={{ color: GRAY3, fontSize: 13 }}>Analyse du brief en cours...</div>
            <style>{`@keyframes prog{0%{width:5%}60%{width:80%}100%{width:96%}}`}</style>
          </div>
        )}

        {/* BRIEF RESULT */}
        {brief && !loading && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.8px" }}>Brief <span style={{ color: ACCENT }}>prêt.</span></div>
                <div style={{ fontSize: 12, color: GRAY3, marginTop: 4 }}>{brief.brand}{brief.client ? ` / ${brief.client}` : ""} — {brief.date}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={copyBrief} style={{ padding: "9px 16px", borderRadius: 8, background: GRAY2, color: WHITE, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {copied ? "✓ Copié" : "📋 Copier"}
                </button>
                <button onClick={() => window.print()} style={{ padding: "9px 16px", borderRadius: 8, background: ACCENT, color: BLACK, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>↓ PDF</button>
              </div>
            </div>

            <div style={{ height: 1, background: BORDER, margin: "20px 0 24px" }} />

            {/* RAW INPUTS */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: GRAY3, marginBottom: 14 }}>Inputs client</div>
              {[
                ["Projet", brief.raw.projet],
                ["Cible", brief.raw.cible],
                ["Concurrents", brief.raw.concurrents],
                ["Positionnement", brief.raw.positionnement],
                ["Inspirations", brief.raw.inspirations],
                ["À éviter", brief.raw.a_eviter],
                ["Livrables", brief.raw.livrables],
                ["Cadre", brief.raw.cadre],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 13 }}>
                  <div style={{ color: GRAY3, minWidth: 110, flexShrink: 0, paddingTop: 1 }}>{label}</div>
                  <div style={{ color: WHITE, lineHeight: 1.55, whiteSpace: "pre-line" }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: BORDER, margin: "24px 0" }} />

            {/* BRIEF FINAL */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>Brief créatif</div>
              {[
                ["Projet", brief.comments.projet],
                ["Cible", brief.comments.cible],
                ["Positionnement", brief.comments.positionnement],
                ["Direction créative", brief.comments.direction_creative],
                ["Références", brief.comments.references],
                ["Livrables & Cadre", brief.comments.livrables_cadre],
              ].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: GRAY3, marginBottom: 5 }}>{label}</div>
                  <div style={{ fontSize: 14, color: WHITE, lineHeight: 1.65 }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Message clé */}
            <div style={{ background: ACCENT, borderRadius: 10, padding: "18px 22px", margin: "24px 0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: BLACK, marginBottom: 8 }}>MESSAGE CLÉ</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: BLACK, lineHeight: 1.4 }}>{brief.comments.message_cle}</div>
            </div>

            {/* CTA */}
            <div style={{ background: GRAY2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "22px 24px", margin: "24px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 6 }}>Tu veux aller plus loin ?</div>
              <div style={{ fontSize: 13, color: GRAY3, marginBottom: 16, lineHeight: 1.6 }}>Ce brief est un point de départ. Pour valider ta direction créative ou démarrer une identité complète, réserve un appel ou commande un Pack Starter.</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="https://calendly.com" target="_blank" rel="noreferrer" style={{ padding: "10px 18px", borderRadius: 8, background: ACCENT, color: BLACK, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Mini Conseil — 50€ →</a>
                <a href="https://notion.so" target="_blank" rel="noreferrer" style={{ padding: "10px 18px", borderRadius: 8, background: "transparent", color: WHITE, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Pack Starter Branding — 450€ →</a>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={reset} style={{ background: "none", border: "none", color: GRAY3, fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>← Nouveau brief</button>
              <div style={{ fontSize: 11, color: GRAY3 }}>Généré par M.ARQUEUR</div>
            </div>
          </div>
        )}

        {/* FORM */}
        {!brief && !loading && (
          <div>
            {step === 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontWeight: 800, fontSize: 38, lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 10 }}>
                  Génère ton brief<br /><span style={{ color: ACCENT }}>créatif.</span>
                </div>
                <div style={{ color: GRAY3, fontSize: 14, lineHeight: 1.6 }}>Réponds en langage naturel — l'IA analyse et commente chaque section.</div>
                {brandName && <div style={{ marginTop: 10, fontSize: 12, color: ACCENT }}>↺ Brouillon restauré : {brandName}</div>}
              </div>
            )}

            {/* Progress bar */}
            <div style={{ display: "flex", gap: 5, marginBottom: 36 }}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? ACCENT : GRAY2, transition: "background 0.3s" }} />
              ))}
            </div>

            {/* STEP 0 — Projet */}
            {step === 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 1 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Le projet</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>Qu'est-ce qu'on crée ?</div>

                <Field label="Nom du client (optionnel)">
                  <Input value={clientName} onChange={setClientName} placeholder="ex : Marie Dupont, Studio Nova..." />
                </Field>
                <Field label="Nom de la marque *" error={errors.brandName}>
                  <Input value={brandName} onChange={setBrandName} placeholder="ex : Yogaga, Café Volt..." error={errors.brandName} />
                </Field>
                <Field label="Type de projet *" error={errors.projectType}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {projectTypes.map(t => <Chip key={t} label={t} selected={projectType.includes(t)} onClick={() => toggleArr(projectType, setProjectType, t)} />)}
                  </div>
                </Field>
                <Field label="Décris le projet *" error={errors.projectDesc}>
                  <Textarea value={projectDesc} onChange={setProjectDesc} placeholder="Ce qu'est la marque, ce qu'elle fait, pourquoi ce projet maintenant..." error={errors.projectDesc} />
                </Field>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnPrimary onClick={() => nextStep(0)}>Suivant →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 1 — Cible */}
            {step === 1 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 2 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>La cible</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>À qui on parle ?</div>

                <Field label="Décris ta cible *" error={errors.target}>
                  <Input value={target} onChange={setTarget} placeholder="ex : Couples 28–45, freelances créatifs, PME locales..." error={errors.target} />
                </Field>
                <Field label="Ses frustrations / besoins *" error={errors.targetNeeds}>
                  <Textarea value={targetNeeds} onChange={setTargetNeeds} placeholder="Ce qui l'énerve, ce qu'elle cherche sans trouver..." error={errors.targetNeeds} />
                </Field>
                <Field label="Concurrents directs (optionnel)">
                  <Input value={competitors} onChange={setCompetitors} placeholder="ex : Yanaï Yoga, Studio Flow, Be Yoga Paris..." />
                </Field>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnSecondary onClick={() => prevStep(1)}>← Retour</BtnSecondary>
                  <BtnPrimary onClick={() => nextStep(1)}>Suivant →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 2 — Positionnement */}
            {step === 2 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 3 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Le positionnement</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>Comment la marque veut être perçue ?</div>

                <Field label="Valeurs *" error={errors.values}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {valuesList.map(v => <Chip key={v} label={v} selected={values.includes(v)} onClick={() => toggleArr(values, setValues, v)} />)}
                  </div>
                </Field>
                <Field label="Ton de communication *" error={errors.tone}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {toneList.map(t => <Chip key={t} label={t} selected={tone.includes(t)} onClick={() => toggleArr(tone, setTone, t)} />)}
                  </div>
                </Field>
                <Field label="Ce que la marque n'est PAS">
                  <Input value={antiPos} onChange={setAntiPos} placeholder="ex : pas corporate, pas agressif, pas générique..." />
                </Field>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnSecondary onClick={() => prevStep(2)}>← Retour</BtnSecondary>
                  <BtnPrimary onClick={() => nextStep(2)}>Suivant →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 3 — Références */}
            {step === 3 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 4 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Les références</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>Ce qui inspire, ce qui repousse.</div>

                <Field label="Marques ou visuels qui inspirent">
                  <Textarea value={inspirations} onChange={setInspirations} placeholder="ex : Jacquemus pour la légèreté, Notion pour la clarté..." />
                </Field>
                <Field label="Ce qu'il faut éviter">
                  <Textarea value={toAvoid} onChange={setToAvoid} placeholder="ex : trop sombre, trop chargé, clichés du bien-être..." />
                </Field>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnSecondary onClick={() => prevStep(3)}>← Retour</BtnSecondary>
                  <BtnPrimary onClick={() => nextStep(3)}>Suivant →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 4 — Livrables */}
            {step === 4 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 5 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Les livrables</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>Ce qui doit être produit.</div>

                <Field label="Livrables attendus *" error={errors.livrables}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {livrablesList.map(l => <Chip key={l} label={l} selected={livrables.includes(l)} onClick={() => toggleArr(livrables, setLivrables, l)} />)}
                  </div>
                </Field>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnSecondary onClick={() => prevStep(4)}>← Retour</BtnSecondary>
                  <BtnPrimary onClick={() => nextStep(4)}>Suivant →</BtnPrimary>
                </div>
              </div>
            )}

            {/* STEP 5 — Cadre */}
            {step === 5 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: ACCENT, marginBottom: 6 }}>Étape 6 / 6</div>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Le cadre</div>
                <div style={{ color: GRAY3, fontSize: 13, marginBottom: 28 }}>Budget, délai, contraintes.</div>

                <Field label="Budget *" error={errors.budget}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {budgetList.map(b => <Chip key={b} label={b} selected={budget === b} onClick={() => setSingle(setBudget, budget, b)} />)}
                  </div>
                </Field>
                <Field label="Délai *" error={errors.deadline}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {deadlineList.map(d => <Chip key={d} label={d} selected={deadline === d} onClick={() => setSingle(setDeadline, deadline, d)} />)}
                  </div>
                </Field>
                <Field label="Contraintes spécifiques">
                  <Textarea value={constraints} onChange={setConstraints} placeholder="ex : logo existant à conserver, formats obligatoires..." />
                </Field>

                {errors.api && (
                  <div style={{ background: "#1f0a0a", border: `1px solid ${ERR}44`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: ERR, fontSize: 13 }}>
                    {errors.api}
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <BtnSecondary onClick={() => prevStep(5)}>← Retour</BtnSecondary>
                  <BtnPrimary onClick={generateBrief}>Générer le brief ✦</BtnPrimary>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
