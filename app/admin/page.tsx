"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Request, type LeadStatus } from "@/lib/supabase";

const STATUS_LABELS: Record<LeadStatus, { label: string; color: string }> = {
  pending: { label: "En attente / قيد الانتظار", color: "bg-yellow-100 text-yellow-800" },
  good: { label: "Bon lead ✅", color: "bg-green-100 text-green-800" },
  bad: { label: "Mauvais lead ❌", color: "bg-red-100 text-red-800" },
};

const BUDGET_COLORS: Record<string, string> = {
  "أقل من 5000 دج": "text-gray-500",
  "Moins de 5 000 DA": "text-gray-500",
  "5000 - 15000 دج": "text-blue-600",
  "5 000 – 15 000 DA": "text-blue-600",
  "15000 - 30000 دج": "text-purple-600",
  "15 000 – 30 000 DA": "text-purple-600",
  "أكثر من 30000 دج": "text-green-600",
  "Plus de 30 000 DA": "text-green-600",
};

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }
    fetchRequests();
  };

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, lead_status: LeadStatus) => {
    await supabase.from("requests").update({ lead_status }).eq("id", id);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, lead_status } : r))
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.lead_status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.lead_status === "pending").length,
    good: requests.filter((r) => r.lead_status === "good").length,
    bad: requests.filter((r) => r.lead_status === "bad").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin Panel — Demandes clients</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Déconnexion
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {([
            { key: "all", label: "Total", icon: "📋", bg: "bg-white" },
            { key: "pending", label: "En attente", icon: "⏳", bg: "bg-yellow-50" },
            { key: "good", label: "Bons leads", icon: "✅", bg: "bg-green-50" },
            { key: "bad", label: "Mauvais leads", icon: "❌", bg: "bg-red-50" },
          ] as const).map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`${s.bg} rounded-xl p-4 text-center shadow-sm border-2 transition ${
                filter === s.key ? "border-blue-500" : "border-transparent"
              } hover:border-blue-400`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-bold text-gray-800">{counts[s.key]}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow">
            Aucune demande pour l&apos;instant.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{req.name}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_LABELS[req.lead_status].color}`}>
                        {STATUS_LABELS[req.lead_status].label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        📞 <a href={`tel:${req.phone}`} className="text-blue-600 hover:underline">{req.phone}</a>
                      </span>
                      {req.budget && (
                        <span className={`font-semibold ${BUDGET_COLORS[req.budget] || "text-gray-600"}`}>
                          💰 {req.budget}
                        </span>
                      )}
                      <span className="text-gray-400">
                        🕐 {new Date(req.created_at).toLocaleDateString("fr-DZ", {
                          day: "2-digit", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {req.project_description && (
                      <p className="text-gray-700 bg-gray-50 rounded-lg px-4 py-3 text-sm">
                        {req.project_description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-fit">
                    <a
                      href={`https://wa.me/${req.phone.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      💬 WhatsApp
                    </a>
                    <button
                      onClick={() => updateStatus(req.id, "good")}
                      disabled={req.lead_status === "good"}
                      className="text-sm font-semibold px-4 py-2 rounded-lg border-2 border-green-500 text-green-700 hover:bg-green-50 disabled:opacity-40 disabled:cursor-default transition"
                    >
                      ✅ Bon lead
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "bad")}
                      disabled={req.lead_status === "bad"}
                      className="text-sm font-semibold px-4 py-2 rounded-lg border-2 border-red-400 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-default transition"
                    >
                      ❌ Mauvais lead
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
