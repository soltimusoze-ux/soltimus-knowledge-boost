
CREATE TABLE public.heat_pump_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Inputs
  building_type TEXT NOT NULL,
  area_m2 NUMERIC(6,2) NOT NULL,
  floors SMALLINT NOT NULL DEFAULT 1,
  insulation TEXT NOT NULL,
  heating_system TEXT NOT NULL,
  occupants SMALLINT NOT NULL DEFAULT 4,
  climate_zone SMALLINT NOT NULL DEFAULT 3,
  -- Result
  heat_demand_kw NUMERIC(5,2) NOT NULL,
  recommended_power_kw NUMERIC(5,2) NOT NULL,
  recommended_series TEXT,
  estimated_price_min INTEGER,
  estimated_price_max INTEGER,
  -- Contact
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  rodo_consent BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  -- Meta
  source_url TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.heat_pump_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can insert a lead via the server function
CREATE POLICY "Anyone can submit a heat pump lead"
ON public.heat_pump_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can read (admin panel)
CREATE POLICY "Authenticated users can view leads"
ON public.heat_pump_leads
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX idx_heat_pump_leads_created_at ON public.heat_pump_leads(created_at DESC);
CREATE INDEX idx_heat_pump_leads_status ON public.heat_pump_leads(status);
