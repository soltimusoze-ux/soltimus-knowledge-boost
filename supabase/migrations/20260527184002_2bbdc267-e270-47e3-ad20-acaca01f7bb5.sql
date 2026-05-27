
-- Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- heat_pump_leads: restrict SELECT to admins
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.heat_pump_leads;
CREATE POLICY "Admins view heat pump leads" ON public.heat_pump_leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- contact_submissions: allow anon insert, admin select
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins view contact submissions" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view contact submissions" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Lock down CMS write policies to admins (replace USING (true) ALL policies)
DROP POLICY IF EXISTS "Auth write authors" ON public.authors;
CREATE POLICY "Admins write authors" ON public.authors
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write case studies" ON public.cms_case_studies;
CREATE POLICY "Admins write case studies" ON public.cms_case_studies
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write article_tags" ON public.article_tags;
CREATE POLICY "Admins write article_tags" ON public.article_tags
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write media" ON public.media_assets;
CREATE POLICY "Admins write media" ON public.media_assets
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write articles" ON public.cms_articles;
CREATE POLICY "Admins write articles" ON public.cms_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write categories" ON public.categories;
CREATE POLICY "Admins write categories" ON public.categories
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write tags" ON public.tags;
CREATE POLICY "Admins write tags" ON public.tags
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write case_study_tags" ON public.case_study_tags;
CREATE POLICY "Admins write case_study_tags" ON public.case_study_tags
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Auth write relationships" ON public.content_relationships;
CREATE POLICY "Admins write relationships" ON public.content_relationships
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage: lock down writes to admins; keep public read for editorial-media assets
DROP POLICY IF EXISTS "Auth upload editorial media" ON storage.objects;
DROP POLICY IF EXISTS "Auth update editorial media" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete editorial media" ON storage.objects;
CREATE POLICY "Admins upload editorial media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'editorial-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update editorial media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'editorial-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete editorial media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'editorial-media' AND public.has_role(auth.uid(), 'admin'));
