-- ==============================================================================
-- Sunnah of Life - Supabase PostgreSQL Schema & Security Policies (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USER PROFILES TABLE (Linked to Supabase Auth)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    city TEXT DEFAULT 'Dhaka',
    country TEXT DEFAULT 'Bangladesh',
    latitude DOUBLE PRECISION DEFAULT 23.8103,
    longitude DOUBLE PRECISION DEFAULT 90.4125,
    madhab TEXT DEFAULT 'Hanafi',
    prayer_calculation_method TEXT DEFAULT 'Karachi',
    notification_preferences JSONB DEFAULT '{"salah_alerts": true, "daily_sunnah": true, "zakat_reminders": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create a profile row whenever a user signs up with Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, is_admin)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'is_admin')::boolean, FALSE)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 2. PRAYERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.prayers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    arabic_name TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    order_number INT NOT NULL,
    rakat_fard INT NOT NULL,
    rakat_sunnah_before INT NOT NULL DEFAULT 0,
    rakat_sunnah_after INT NOT NULL DEFAULT 0,
    rakat_nafl INT NOT NULL DEFAULT 0,
    time_window_description TEXT NOT NULL,
    significance TEXT NOT NULL,
    special_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. HADITHS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hadiths (
    id SERIAL PRIMARY KEY,
    prayer_id INT REFERENCES public.prayers(id) ON DELETE SET NULL,
    module TEXT NOT NULL, -- prayer, eating, sunnah, income, general
    arabic_text TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT NOT NULL,
    source TEXT NOT NULL,
    narrator TEXT,
    topic TEXT,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. SUNNAH PRACTICES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sunnahs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    arabic_title TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- morning, evening, sleep, hygiene, social, worship, eating, travel, general
    difficulty TEXT NOT NULL DEFAULT 'easy', -- easy, medium, advanced
    is_daily BOOLEAN DEFAULT TRUE,
    time_of_day TEXT,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    order_number INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. FOODS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.foods (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    arabic_name TEXT,
    status TEXT NOT NULL, -- halal, haram, makruh, doubtful
    category TEXT NOT NULL, -- meat, seafood, dairy, grain, fruit, beverage, additive
    reason TEXT NOT NULL,
    quran_reference TEXT,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. EATING ETIQUETTES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.eating_etiquettes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL, -- sunnah, adab, prohibition
    arabic_text TEXT,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    order_number INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. DUAS FOR EATING TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dua_for_eatings (
    id SERIAL PRIMARY KEY,
    occasion TEXT NOT NULL, -- before_eating, after_eating, forgot_bismillah, drinking, iftar, suhoor
    arabic_text TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    translation TEXT NOT NULL,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. ADHKARS & TASBEEH TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.adhkars (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- morning, evening, before_sleep, after_prayer, general
    arabic_text TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    translation TEXT NOT NULL,
    repetitions INT NOT NULL DEFAULT 1,
    source TEXT,
    time_of_day TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. INCOME TYPES & RIZQ TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.income_types (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- halal, haram, doubtful
    industry TEXT NOT NULL,
    explanation TEXT NOT NULL,
    quran_reference TEXT,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. ISLAMIC FINANCE CONCEPTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.islamic_finance_concepts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    arabic_title TEXT,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    detailed_explanation TEXT,
    key_principles TEXT,
    modern_examples TEXT,
    order_number INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. BUSINESS ETHICS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_ethics (
    id SERIAL PRIMARY KEY,
    principle TEXT NOT NULL,
    arabic_term TEXT,
    explanation TEXT NOT NULL,
    practical_application TEXT,
    hadith_id INT REFERENCES public.hadiths(id) ON DELETE SET NULL,
    order_number INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. USER LOGS & TRACKERS (USER ISOLATED VIA RLS)
-- ------------------------------------------------------------------------------

-- Daily Salah Logs
CREATE TABLE IF NOT EXISTS public.prayer_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    prayer_id INT NOT NULL REFERENCES public.prayers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status TEXT NOT NULL, -- prayed, missed, qada, congregation
    prayed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_prayer_date UNIQUE (user_id, prayer_id, date)
);

-- Daily Sunnah Logs
CREATE TABLE IF NOT EXISTS public.sunnah_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sunnah_id INT NOT NULL REFERENCES public.sunnahs(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_sunnah_date UNIQUE (user_id, sunnah_id, date)
);

-- Zakat Calculations History
CREATE TABLE IF NOT EXISTS public.zakat_calculations (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    year INT NOT NULL,
    cash_savings NUMERIC(15,2) DEFAULT 0,
    gold_value NUMERIC(15,2) DEFAULT 0,
    silver_value NUMERIC(15,2) DEFAULT 0,
    business_assets NUMERIC(15,2) DEFAULT 0,
    receivables NUMERIC(15,2) DEFAULT 0,
    liabilities NUMERIC(15,2) DEFAULT 0,
    nisab_threshold NUMERIC(15,2) DEFAULT 0,
    net_zakatable_assets NUMERIC(15,2) DEFAULT 0,
    zakat_due NUMERIC(15,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. USER SUGGESTIONS (WITH CLOUDINARY MEDIA SUPPORT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.suggestions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    email TEXT,
    message TEXT NOT NULL,
    image_path TEXT, -- Cloudinary secure URL
    ip_address TEXT,
    status TEXT DEFAULT 'pending', -- pending, reviewed, resolved
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunnahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eating_etiquettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dua_for_eatings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adhkars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.islamic_finance_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_ethics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunnah_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zakat_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by anyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Public Read Policies for Reference & Content Tables
CREATE POLICY "Allow public read on prayers" ON public.prayers FOR SELECT USING (true);
CREATE POLICY "Allow public read on hadiths" ON public.hadiths FOR SELECT USING (true);
CREATE POLICY "Allow public read on sunnahs" ON public.sunnahs FOR SELECT USING (true);
CREATE POLICY "Allow public read on foods" ON public.foods FOR SELECT USING (true);
CREATE POLICY "Allow public read on eating_etiquettes" ON public.eating_etiquettes FOR SELECT USING (true);
CREATE POLICY "Allow public read on dua_for_eatings" ON public.dua_for_eatings FOR SELECT USING (true);
CREATE POLICY "Allow public read on adhkars" ON public.adhkars FOR SELECT USING (true);
CREATE POLICY "Allow public read on income_types" ON public.income_types FOR SELECT USING (true);
CREATE POLICY "Allow public read on islamic_finance_concepts" ON public.islamic_finance_concepts FOR SELECT USING (true);
CREATE POLICY "Allow public read on business_ethics" ON public.business_ethics FOR SELECT USING (true);

-- 3. Admin Manage Policies for Reference Content
CREATE POLICY "Admins can manage hadiths" ON public.hadiths FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage sunnahs" ON public.sunnahs FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage foods" ON public.foods FOR ALL USING (public.is_admin());

-- 4. User Log Policies (Strict Isolation)
CREATE POLICY "Users can manage own prayer_logs" ON public.prayer_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own sunnah_logs" ON public.sunnah_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own zakat_calculations" ON public.zakat_calculations FOR ALL USING (auth.uid() = user_id);

-- 5. Suggestions Policies
CREATE POLICY "Anyone can submit a suggestion" ON public.suggestions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage suggestions" ON public.suggestions FOR ALL USING (public.is_admin());
