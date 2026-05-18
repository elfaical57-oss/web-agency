"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Lang = "ar" | "fr";

const t = {
  ar: {
    dir: "rtl" as const,
    nav: { brand: "WebPro", cta: "اطلب موقعك", lang: "Français" },
    hero: {
      badge: "✦ وكالة تصميم مواقع متخصصة",
      title: "موقعك الاحترافي",
      titleAccent: "يبدأ من هنا",
      sub: "نصمم مواقع احترافية تجلب لك الزبائن وتزيد مبيعاتك — تسليم سريع، جودة عالية، بأسعار مناسبة.",
      stat1: { n: "+150", l: "مشروع منجز" },
      stat2: { n: "98%", l: "عملاء راضون" },
      stat3: { n: "3 أيام", l: "متوسط التسليم" },
      stat4: { n: "999 DH", l: "بدل 1500 DH" },
    },
    form: {
      title: "احصل على عرض مجاني",
      sub: "أرسل طلبك وسنتواصل معك خلال ساعة",
      name: "الاسم الكامل",
      namePh: "أحمد بن علي",
      phone: "رقم الهاتف / واتساب",
      phonePh: "06 00 00 00 00",
      type: "نوع الموقع",
      types: ["اختر نوع المشروع", "موقع تجاري / شركة", "متجر إلكتروني", "مطعم / كافيه", "عيادة / طبي", "بورتفوليو شخصي", "تحسين محركات البحث (SEO)", "قاعدة بيانات / نظام إدارة", "أخرى"],
      extras: "خيارات إضافية",
      extrasList: [
        { id: "seo", label: "🔍 SEO" },
        { id: "domain", label: "🌐 نطاق .com" },
        { id: "admin", label: "🗄️ لوحة تحكم" },
        { id: "maintenance", label: "🔧 صيانة" },
      ],
      desc: "تفاصيل المشروع (اختياري)",
      descPh: "اشرح لنا ما تحتاجه...",
      submit: "أرسل طلبي الآن ←",
      sending: "جارٍ الإرسال...",
      ok: { t: "تم استلام طلبك!", s: "سنتواصل معك قريباً على واتساب." },
      err: "حدث خطأ. يرجى المحاولة مجدداً.",
      note: "مجاناً • بدون التزام • رد خلال ساعة",
    },
    services: {
      title: "ماذا نصنع لك؟",
      sub: "كل أنواع المواقع الاحترافية بجودة عالية",
      list: [
        { icon: "🏢", t: "موقع الشركة", d: "موقع احترافي يعكس هوية شركتك ويكسب ثقة الزبائن" },
        { icon: "🛒", t: "متجر إلكتروني", d: "بع منتجاتك أونلاين مع نظام دفع ومتابعة طلبات كامل" },
        { icon: "🔍", t: "تحسين SEO", d: "ارفع موقعك في نتائج جوجل واجذب زوار حقيقيين مجاناً" },
        { icon: "🗄️", t: "قاعدة بيانات / نظام", d: "أنظمة إدارة بيانات مخصصة لشركتك أو مشروعك" },
      ],
    },
    why: {
      title: "لماذا تختارنا؟",
      list: [
        { icon: "⚡", t: "تسليم سريع", d: "معظم المشاريع تُسلَّم خلال 3 إلى 7 أيام" },
        { icon: "📱", t: "متوافق مع الجوال", d: "موقعك يبدو رائعاً على كل الأجهزة" },
        { icon: "🔧", t: "دعم ما بعد التسليم", d: "لن تُترك وحدك — نحن هنا بعد الإطلاق" },
        { icon: "💳", t: "أسعار شفافة", d: "لا رسوم خفية، تعرف السعر مسبقاً" },
      ],
    },
    reviews: {
      title: "ماذا يقول عملاؤنا",
      list: [
        { n: "يوسف البقالي", r: "5/5", t: "مطعم، الدار البيضاء", d: "موقع رائع، التصميم احترافي جداً والتسليم كان في الوقت المحدد. زادت حجوزاتنا بعد الإطلاق!" },
        { n: "سلمى الإدريسي", r: "5/5", t: "طبيبة أسنان، الرباط", d: "كنت أريد موقعاً للعيادة وحصلت على أكثر مما توقعت. تجربة ممتازة من البداية للنهاية." },
        { n: "أمين بنسودة", r: "5/5", t: "متجر إلكتروني، مراكش", d: "الآن أبيع أونلاين بكل سهولة. ينصح به بشدة لكل من يريد موقعاً احترافياً." },
      ],
    },
    footer: { rights: "جميع الحقوق محفوظة" },
  },
  fr: {
    dir: "ltr" as const,
    nav: { brand: "WebPro", cta: "Demander un site", lang: "العربية" },
    hero: {
      badge: "✦ Agence de création de sites web",
      title: "Votre site professionnel",
      titleAccent: "commence ici",
      sub: "Nous créons des sites web professionnels qui attirent vos clients et boostent vos ventes — livraison rapide, haute qualité, prix abordables.",
      stat1: { n: "150+", l: "Projets livrés" },
      stat2: { n: "98%", l: "Clients satisfaits" },
      stat3: { n: "3 jours", l: "Délai moyen" },
      stat4: { n: "999 DH", l: "au lieu de 1 500 DH" },
    },
    form: {
      title: "Obtenez un devis gratuit",
      sub: "Envoyez votre demande, nous vous répondons en 1h",
      name: "Nom complet",
      namePh: "Ahmed Ben Ali",
      phone: "Téléphone / WhatsApp",
      phonePh: "06 00 00 00 00",
      type: "Type de site",
      types: ["Choisir le type de projet", "Site vitrine / entreprise", "Boutique en ligne", "Restaurant / café", "Clinique / médical", "Portfolio personnel", "Référencement SEO", "Base de données / Système de gestion", "Autre"],
      extras: "Options supplémentaires",
      extrasList: [
        { id: "seo", label: "🔍 SEO" },
        { id: "domain", label: "🌐 Domaine .com" },
        { id: "admin", label: "🗄️ Espace admin" },
        { id: "maintenance", label: "🔧 Maintenance" },
      ],
      desc: "Détails du projet (facultatif)",
      descPh: "Décrivez votre besoin...",
      submit: "Envoyer ma demande →",
      sending: "Envoi en cours...",
      ok: { t: "Demande reçue !", s: "Nous vous contacterons bientôt sur WhatsApp." },
      err: "Une erreur s'est produite. Veuillez réessayer.",
      note: "Gratuit • Sans engagement • Réponse en 1h",
    },
    services: {
      title: "Ce que nous créons",
      sub: "Tous types de sites professionnels, haute qualité",
      list: [
        { icon: "🏢", t: "Site d'entreprise", d: "Un site professionnel qui reflète votre identité et inspire confiance" },
        { icon: "🛒", t: "Boutique en ligne", d: "Vendez en ligne avec paiement intégré et suivi des commandes" },
        { icon: "🔍", t: "Référencement SEO", d: "Montez dans les résultats Google et attirez des visiteurs gratuitement" },
        { icon: "🗄️", t: "Base de données / Système", d: "Systèmes de gestion de données sur mesure pour votre activité" },
      ],
    },
    why: {
      title: "Pourquoi nous choisir ?",
      list: [
        { icon: "⚡", t: "Livraison rapide", d: "La plupart des projets livrés en 3 à 7 jours" },
        { icon: "📱", t: "100% responsive", d: "Votre site est parfait sur tous les appareils" },
        { icon: "🔧", t: "Support après livraison", d: "Nous restons disponibles même après le lancement" },
        { icon: "💳", t: "Prix transparents", d: "Pas de frais cachés, vous connaissez le prix à l'avance" },
      ],
    },
    reviews: {
      title: "Ce que disent nos clients",
      list: [
        { n: "Youssef El Bakali", r: "5/5", t: "Restaurant, Casablanca", d: "Design magnifique, livraison dans les délais. Nos réservations ont augmenté après le lancement !" },
        { n: "Salma Idrissi", r: "5/5", t: "Dentiste, Rabat", d: "Je voulais un site pour mon cabinet et j'ai obtenu bien plus. Expérience excellente du début à la fin." },
        { n: "Amine Bensouda", r: "5/5", t: "E-commerce, Marrakech", d: "Je vends en ligne facilement maintenant. Je recommande vivement à quiconque veut un site professionnel." },
      ],
    },
    footer: { rights: "Tous droits réservés" },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [form, setForm] = useState({ name: "", phone: "", project_description: "", type: "" });
  const [extras, setExtras] = useState<string[]>([]);

  const toggleExtra = (id: string) =>
    setExtras((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const totalPrice = 999 + extras.length * 200;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const c = t[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("requests").insert([{
      name: form.name,
      phone: `+212${form.phone}`,
      project_description: `[${form.type}]${extras.length ? ` [${extras.join(", ")}]` : ""} ${form.project_description}`.trim(),
      budget: "",
      lead_status: "pending",
    }]);
    setStatus(error ? "error" : "success");
    if (!error) { setForm({ name: "", phone: "", project_description: "", type: "" }); setExtras([]); }
  };

  return (
    <div dir={c.dir} className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Cairo', sans-serif" }}>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight">{c.nav.brand}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
              className="text-sm text-gray-500 hover:text-blue-700 transition font-medium"
            >
              {c.nav.lang}
            </button>
            <a href="#form" className="bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-800 transition shadow-sm">
              {c.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div>
            <span className="inline-block text-blue-400 text-sm font-semibold mb-5 tracking-widest uppercase">
              {c.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {c.hero.title}{" "}
              <span className="text-blue-400">{c.hero.titleAccent}</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              {c.hero.sub}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[c.hero.stat1, c.hero.stat2, c.hero.stat3, c.hero.stat4].map((s) => (
                <div key={s.l} className="bg-white/5 rounded-xl px-4 py-3">
                  <div className="text-2xl font-extrabold text-white" dir="ltr">{s.n}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FORM */}
          <div id="form">
            {status === "success" ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{c.form.ok.t}</h3>
                <p className="text-gray-500">{c.form.ok.s}</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{c.form.title}</h2>
                <p className="text-sm text-gray-500 mb-6">{c.form.sub}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{c.form.name} *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={c.form.namePh}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{c.form.phone} *</label>
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500" dir="ltr">
                        <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 flex items-center border-e border-gray-200 shrink-0" dir="ltr">+212</span>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            const max = digits.startsWith("0") ? 10 : 9;
                            setForm({ ...form, phone: digits.slice(0, max) });
                          }}
                          placeholder={c.form.phonePh}
                          dir="ltr"
                          inputMode="numeric"
                          minLength={9}
                          maxLength={form.phone.startsWith("0") ? 10 : 9}
                          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{c.form.type}</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {c.form.types.map((o, i) => (
                        <option key={i} value={i === 0 ? "" : o} className="text-gray-900 bg-white">{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">{c.form.extras}</label>
                    <div className="grid grid-cols-2 gap-2">
                      {c.form.extrasList.map((opt) => {
                        const checked = extras.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleExtra(opt.id)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-start ${
                              checked
                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                              checked ? "border-blue-600 bg-blue-600" : "border-gray-300"
                            }`}>
                              {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{c.form.desc}</label>
                    <textarea
                      rows={2}
                      value={form.project_description}
                      onChange={(e) => setForm({ ...form, project_description: e.target.value })}
                      placeholder={c.form.descPh}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg py-2.5 px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 text-xs font-medium">
                        {lang === "ar" ? "السعر الإجمالي" : "Prix total"}
                      </span>
                      <div className="flex items-center gap-2" dir="ltr">
                        <span className="text-gray-400 text-sm line-through">{extras.length > 0 ? `${999 + extras.length * 200 + 501} DH` : "1 500 DH"}</span>
                        <span className="text-green-600 text-xl font-extrabold">{totalPrice} DH</span>
                      </div>
                    </div>
                    {extras.length === 0 && (
                      <p className="text-xs text-green-600 mt-0.5 text-end" dir="ltr">
                        {lang === "ar" ? "🎉 501 DH وفّرت" : "🎉 Vous économisez 501 DH"}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center">{c.form.err}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-blue-700 text-white font-bold py-3.5 rounded-lg text-base hover:bg-blue-800 active:scale-95 transition disabled:opacity-60 shadow-md"
                  >
                    {status === "sending" ? c.form.sending : c.form.submit}
                  </button>

                  <p className="text-center text-xs text-gray-400">{c.form.note}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{c.services.title}</h2>
            <p className="text-gray-500">{c.services.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.services.list.map((s) => (
              <div
                key={s.t}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group cursor-default"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition">{s.t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">{c.why.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.why.list.map((w) => (
              <div key={w.t} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  {w.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{w.t}</h4>
                  <p className="text-sm text-gray-500">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">{c.reviews.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.reviews.list.map((r) => (
              <div key={r.n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-yellow-400 text-lg mb-3" dir="ltr">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{r.d}&rdquo;</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 text-sm">{r.n}</div>
                  <div className="text-xs text-gray-400">{r.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-blue-700 py-14 px-5 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-3">
          {lang === "ar" ? "هل أنت جاهز لإطلاق موقعك؟" : "Prêt à lancer votre site ?"}
        </h2>
        <p className="text-blue-200 mb-7 text-lg">
          {lang === "ar" ? "لا تتردد — اطلب عرضك المجاني الآن" : "Ne tardez plus — demandez votre devis gratuit maintenant"}
        </p>
        <a
          href="#form"
          className="inline-block bg-white text-blue-700 font-extrabold px-10 py-4 rounded-xl text-lg hover:bg-blue-50 transition shadow-lg"
        >
          {c.nav.cta} →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-5 text-center text-sm">
        <div className="font-bold text-white mb-1 text-lg">{c.nav.brand}</div>
        <p>© {new Date().getFullYear()} — {c.footer.rights}</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/213555000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-xl hover:bg-green-600 hover:scale-110 transition-all"
        title="WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
