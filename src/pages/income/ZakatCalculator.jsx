import React, { useState } from 'react';
import { calculateZakat, DEFAULT_METAL_PRICES, NISAB_WEIGHTS } from '../../services/zakat';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import {
  Calculator,
  ArrowLeft,
  Coins,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ZakatCalculator = () => {
  const { user } = useAuth();

  // Form states
  const [cash, setCash] = useState('');
  const [bankSavings, setBankSavings] = useState('');
  const [goldValue, setGoldValue] = useState('');
  const [silverValue, setSilverValue] = useState('');
  const [businessInventory, setBusinessInventory] = useState('');
  const [investments, setInvestments] = useState('');
  const [moneyOwedToYou, setMoneyOwedToYou] = useState('');
  
  const [debtsOwedByYou, setDebtsOwedByYou] = useState('');
  const [immediateExpenses, setImmediateExpenses] = useState('');

  // Metal price & standard settings
  const [goldPrice, setGoldPrice] = useState(DEFAULT_METAL_PRICES.goldPerGram);
  const [silverPrice, setSilverPrice] = useState(DEFAULT_METAL_PRICES.silverPerGram);
  const [nisabStandard, setNisabStandard] = useState('silver');

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  // Compute live calculation
  const results = calculateZakat({
    cash,
    bankSavings,
    goldValue,
    silverValue,
    businessInventory,
    investments,
    moneyOwedToYou,
    debtsOwedByYou,
    immediateExpenses,
    nisabStandard,
    customGoldPrice: goldPrice,
    customSilverPrice: silverPrice,
  });

  const handleReset = () => {
    setCash('');
    setBankSavings('');
    setGoldValue('');
    setSilverValue('');
    setBusinessInventory('');
    setInvestments('');
    setMoneyOwedToYou('');
    setDebtsOwedByYou('');
    setImmediateExpenses('');
    setSaveMessage(null);
  };

  const handleSaveCalculation = async () => {
    setSaving(true);
    setSaveMessage(null);

    const calcData = {
      year: new Date().getFullYear(),
      cash_savings: Number(cash || 0) + Number(bankSavings || 0),
      gold_value: Number(goldValue || 0),
      silver_value: Number(silverValue || 0),
      business_assets: Number(businessInventory || 0),
      receivables: Number(moneyOwedToYou || 0),
      liabilities: Number(debtsOwedByYou || 0) + Number(immediateExpenses || 0),
      nisab_threshold: results.nisabThreshold,
      net_zakatable_assets: results.netZakatableWealth,
      zakat_due: results.zakatDue,
      notes: `Standard: ${nisabStandard}`
    };

    try {
      if (isSupabaseConfigured() && user) {
        const { error } = await supabase.from('zakat_calculations').insert([
          {
            user_id: user.id,
            ...calcData
          }
        ]);
        if (error) throw error;
      } else {
        // Fallback localStorage
        const existing = JSON.parse(localStorage.getItem('sunnah_zakat_history') || '[]');
        existing.push({ id: Date.now(), created_at: new Date().toISOString(), ...calcData });
        localStorage.setItem('sunnah_zakat_history', JSON.stringify(existing));
      }

      setSaveMessage('Calculation saved successfully!');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      console.error('Error saving zakat:', err);
      setSaveMessage('Failed to save calculation.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          to="/income"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-3 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Halal Rizq Overview
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Real-Time Zakat Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Compute your 2.5% annual Zakat obligation with live Nisab benchmarks on gold and silver.
        </p>
      </div>

      {/* Benchmark / Nisab Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              Nisab Benchmark Standard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The minimum threshold above which Zakat becomes mandatory.
            </p>
          </div>

          {/* Standard Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => setNisabStandard('silver')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                nisabStandard === 'silver'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Silver Standard (612.36g)
            </button>
            <button
              onClick={() => setNisabStandard('gold')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                nisabStandard === 'gold'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Gold Standard (87.48g)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Gold Price / gram ($)
            </label>
            <input
              type="number"
              value={goldPrice}
              onChange={(e) => setGoldPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Silver Price / gram ($)
            </label>
            <input
              type="number"
              value={silverPrice}
              onChange={(e) => setSilverPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Form Inputs vs Summary Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Asset & Liability Inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Assets Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-emerald-600">➕</span> 1. Zakatable Assets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Cash on Hand
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Bank Savings & Checking
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={bankSavings}
                  onChange={(e) => setBankSavings(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Gold Value Owned
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={goldValue}
                  onChange={(e) => setGoldValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Silver Value Owned
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={silverValue}
                  onChange={(e) => setSilverValue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Business Inventory / Stock
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={businessInventory}
                  onChange={(e) => setBusinessInventory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Money Owed to You (Receivables)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={moneyOwedToYou}
                  onChange={(e) => setMoneyOwedToYou(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Deductible Liabilities Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-red-500">➖</span> 2. Deductible Liabilities (Immediate Debts)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Immediate Debts Due
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={debtsOwedByYou}
                  onChange={(e) => setDebtsOwedByYou(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Immediate Living Expenses Due
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={immediateExpenses}
                  onChange={(e) => setImmediateExpenses(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Zakat Result Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
              Calculation Summary
            </span>

            {/* Total Zakatable Wealth */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Net Zakatable Wealth:</span>
              <div className="text-2xl font-black font-mono text-white">
                ${results.netZakatableWealth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {/* Nisab Threshold */}
            <div className="space-y-1 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>Nisab Threshold ({nisabStandard}):</span>
                <span className="font-mono text-white font-bold">
                  ${results.nisabThreshold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1">
                <span>Eligibility Status:</span>
                <span
                  className={`font-bold ${
                    results.isEligible ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {results.isEligible ? 'Zakat is Mandatory' : 'Below Nisab'}
                </span>
              </div>
            </div>

            {/* Total Zakat Due */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/15 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                Total Zakat Due (2.5%)
              </span>
              <div className="text-3xl font-black font-mono text-emerald-400">
                ${results.zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            {saveMessage && (
              <div className="text-xs font-bold text-center text-emerald-300">
                {saveMessage}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSaveCalculation}
                disabled={saving || results.netZakatableWealth === 0}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> Save Calculation
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Form
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ZakatCalculator;
