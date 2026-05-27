
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "Anyone can submit a heat pump lead" ON public.heat_pump_leads;
CREATE POLICY "Visitors submit heat pump leads" ON public.heat_pump_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() = ANY (ARRAY['anon','authenticated']));

DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Visitors submit contact" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (auth.role() = ANY (ARRAY['anon','authenticated']));
