'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [sourceFilter, setSourceFilter] = useState('All');
  const [govFilter, setGovFilter] = useState('All');
  const [statutFilter, setStatutFilter] = useState('All');
  const [search, setSearch] = useState('');

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        setAuth(true);
        fetchData();
      } else {
        setAuth(false);
        setLoading(false);
      }
    } catch {
      setAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // Auto refresh every 60s
    const interval = setInterval(() => {
      if(auth) fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/dashboard/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      setAuth(true);
      fetchData();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchData = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch(`/api/dashboard/leads?source=${sourceFilter}&gouvernorat=${govFilter}&statut=${statutFilter}&search=${search}`)
      ]);
      const { leads } = await leadsRes.json();
      const stats = await statsRes.json();
      setLeads(leads || []);
      setStats(stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(auth) fetchData();
  }, [sourceFilter, govFilter, statutFilter, search]);

  const updateLead = async (id: string, updates: any) => {
    try {
      await fetch(`/api/dashboard/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="min-h-screen grid items-center justify-center bg-navy text-gold">Chargement...</div>;
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-navy2 p-8 rounded-2xl border border-white/10 w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-white text-2xl font-playfair font-bold text-center mb-4">Sunexa Dash</h1>
          <input 
            type="password" 
            placeholder="Mot de passe admin" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold" 
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="bg-gold text-navy font-bold py-3 rounded-xl mt-2 hover:bg-gold2">Connexion</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-navy text-white text-sm">
      {/* Sidebar placeholder / Header for simpler UI */}
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        
        <header className="bg-navy2 border-b border-white/10 p-6 flex justify-between items-center">
          <h1 className="font-playfair text-2xl font-bold text-gold">Dashboard Sunexa</h1>
          <button 
            onClick={() => {
              document.cookie = 'sunexa_dash_auth=; Max-Age=0; path=/';
              setAuth(false);
            }} 
            className="text-gray hover:text-white transition-colors"
          >
            Déconnexion
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* KPI Row */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-navy3 border border-white/5 p-6 rounded-xl">
                <p className="text-gray mb-1">Total Leads</p>
                <p className="text-3xl font-bold font-playfair">{stats.total}</p>
              </div>
              <div className="bg-navy3 border border-white/5 p-6 rounded-xl">
                <p className="text-gray mb-1">Leads Aujourd'hui</p>
                <p className="text-3xl font-bold font-playfair text-gold">{stats.today}</p>
              </div>
              <div className="bg-navy3 border border-white/5 p-6 rounded-xl">
                <p className="text-gray mb-1">Taux de Conversion</p>
                <p className="text-3xl font-bold font-playfair">{stats.conversion}%</p>
              </div>
              <div className="bg-navy3 border border-white/5 p-6 rounded-xl">
                <p className="text-gray mb-1">CA Potentiel (est.)</p>
                <p className="text-3xl font-bold font-playfair text-success">{stats.revenue_potential.toLocaleString()} TND</p>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-navy2 border border-white/5 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center flex-1">
              <input 
                type="text" 
                placeholder="Rechercher nom ou tél..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-navy border border-white/10 rounded-lg px-3 py-2 text-white text-sm flex-1 min-w-[200px] max-w-sm"
              />
              <select value={statutFilter} onChange={e => setStatutFilter(e.target.value)} className="bg-navy border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                <option value="All">Tous les statuts</option>
                <option value="Nouveau">Nouveau</option>
                <option value="Contacté">Contacté</option>
                <option value="Devis envoyé">Devis envoyé</option>
                <option value="Gagné">Gagné</option>
                <option value="Perdu">Perdu</option>
              </select>
            </div>
            
            <a 
              href={`/api/dashboard/export?source=${sourceFilter}&gouvernorat=${govFilter}&statut=${statutFilter}&search=${search}`}
              download
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 border border-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              Exporter CSV
            </a>
          </div>

          {/* Table */}
          <div className="bg-navy2 rounded-xl border border-white/5 overflow-x-auto flex-1">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-navy3/50 text-gray">
                <tr>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Nom</th>
                  <th className="p-4 font-medium">Téléphone</th>
                  <th className="p-4 font-medium">Lieu</th>
                  <th className="p-4 font-medium">Source</th>
                  <th className="p-4 font-medium">Statut</th>
                  <th className="p-4 font-medium w-full">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-gray">{new Date(lead.created_at).toLocaleDateString('fr-TN')}</td>
                    <td className="p-4 font-bold">{lead.nom}</td>
                    <td className="p-4"><a href={`https://wa.me/216${lead.telephone}`} target="_blank" className="text-success hover:underline">{lead.telephone}</a></td>
                    <td className="p-4">{lead.gouvernorat}</td>
                    <td className="p-4">
                      <span className="bg-white/10 px-2 py-1 rounded text-xs">{lead.source_campaign || 'direct'}</span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={lead.statut} 
                        onChange={(e) => updateLead(lead.id, { statut: e.target.value })}
                        className={`bg-transparent border border-white/10 rounded px-2 py-1 outline-none font-bold
                          ${lead.statut === 'Nouveau' ? 'text-blue-400' : ''}
                          ${lead.statut === 'Gagné' ? 'text-success' : ''}
                          ${lead.statut === 'Perdu' ? 'text-red-400' : ''}
                        `}
                      >
                        <option value="Nouveau">Nouveau</option>
                        <option value="Contacté">Contacté</option>
                        <option value="Devis envoyé">Devis envoyé</option>
                        <option value="Gagné">Gagné</option>
                        <option value="Perdu">Perdu</option>
                      </select>
                    </td>
                    <td className="p-4 w-full">
                      <input 
                        type="text" 
                        defaultValue={lead.notes || ''}
                        onBlur={(e) => {
                          if (e.target.value !== lead.notes) {
                            updateLead(lead.id, { notes: e.target.value });
                          }
                        }}
                        placeholder="Ajouter une note..."
                        className="bg-transparent border-b border-transparent hover:border-white/10 focus:border-gold w-full min-w-[200px] outline-none transition-colors px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 && (
              <div className="p-12 text-center text-gray">
                Aucun lead trouvé avec ces critères.
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
