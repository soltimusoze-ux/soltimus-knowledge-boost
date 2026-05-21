
-- =========================================================
-- Phase 5 — Editorial CMS schema
-- =========================================================

-- Shared updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------- AUTHORS ----------
CREATE TABLE public.authors (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  role         text,
  bio          text,
  expertise    text[] DEFAULT '{}'::text[],
  linkedin_url text,
  avatar_url   text,
  credentials  text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_authors_updated BEFORE UPDATE ON public.authors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- CATEGORIES ----------
CREATE TABLE public.categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,
  name        text NOT NULL,
  description text,
  color       text,
  sort_order  int  NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- TAGS ----------
CREATE TABLE public.tags (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       text NOT NULL UNIQUE,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- MEDIA ASSETS ----------
CREATE TABLE public.media_assets (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url        text NOT NULL,
  storage_path text,
  alt        text,
  caption    text,
  mime_type  text,
  width      int,
  height     int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_media_updated BEFORE UPDATE ON public.media_assets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- ARTICLES ----------
CREATE TYPE public.content_status AS ENUM ('draft', 'scheduled', 'published', 'archived');

CREATE TABLE public.cms_articles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE,
  title           text NOT NULL,
  excerpt         text,
  body            jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url text,
  author_id       uuid REFERENCES public.authors(id) ON DELETE SET NULL,
  category_id     uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  status          public.content_status NOT NULL DEFAULT 'draft',
  published_at    timestamptz,
  scheduled_for   timestamptz,
  reading_minutes int,
  seo_title       text,
  seo_description text,
  canonical_url   text,
  og_image_url    text,
  faq             jsonb DEFAULT '[]'::jsonb,
  city            text,
  region          text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_cms_articles_status ON public.cms_articles(status);
CREATE INDEX idx_cms_articles_published_at ON public.cms_articles(published_at DESC);
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON public.cms_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- CASE STUDIES ----------
CREATE TABLE public.cms_case_studies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE,
  title           text NOT NULL,
  summary         text,
  body            jsonb NOT NULL DEFAULT '[]'::jsonb,
  hero_image_url  text,
  author_id       uuid REFERENCES public.authors(id) ON DELETE SET NULL,
  category_id     uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  status          public.content_status NOT NULL DEFAULT 'draft',
  published_at    timestamptz,
  scheduled_for   timestamptz,
  city            text,
  region          text,
  building_type   text,
  metrics         jsonb DEFAULT '[]'::jsonb,
  faq             jsonb DEFAULT '[]'::jsonb,
  seo_title       text,
  seo_description text,
  canonical_url   text,
  og_image_url    text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_cms_cases_status ON public.cms_case_studies(status);
CREATE INDEX idx_cms_cases_published_at ON public.cms_case_studies(published_at DESC);
CREATE TRIGGER trg_cases_updated BEFORE UPDATE ON public.cms_case_studies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- TAG JOIN TABLES ----------
CREATE TABLE public.article_tags (
  article_id uuid NOT NULL REFERENCES public.cms_articles(id) ON DELETE CASCADE,
  tag_id     uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE public.case_study_tags (
  case_study_id uuid NOT NULL REFERENCES public.cms_case_studies(id) ON DELETE CASCADE,
  tag_id        uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (case_study_id, tag_id)
);

-- ---------- CONTENT RELATIONSHIPS ----------
-- Generic graph: source/target by (type, slug) to allow linking across
-- registry-driven content (services, lab episodes) and DB content.
CREATE TABLE public.content_relationships (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type     text NOT NULL,  -- 'article' | 'case_study' | 'service' | 'lab_episode' | 'faq'
  source_slug     text NOT NULL,
  target_type     text NOT NULL,
  target_slug     text NOT NULL,
  relation        text NOT NULL DEFAULT 'related',
  sort_order      int  NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_type, source_slug, target_type, target_slug, relation)
);
CREATE INDEX idx_relationships_source ON public.content_relationships(source_type, source_slug);
CREATE INDEX idx_relationships_target ON public.content_relationships(target_type, target_slug);

-- ---------- RLS ----------
ALTER TABLE public.authors             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_articles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_case_studies    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_study_tags     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_relationships ENABLE ROW LEVEL SECURITY;

-- Public read for reference tables
CREATE POLICY "Public read authors" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public read media" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public read article_tags" ON public.article_tags FOR SELECT USING (true);
CREATE POLICY "Public read case_study_tags" ON public.case_study_tags FOR SELECT USING (true);
CREATE POLICY "Public read relationships" ON public.content_relationships FOR SELECT USING (true);

-- Public read only published content; authenticated users see all
CREATE POLICY "Public read published articles" ON public.cms_articles
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Public read published case studies" ON public.cms_case_studies
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

-- Authenticated full write across editorial tables (single-tier, no roles yet)
CREATE POLICY "Auth write authors"             ON public.authors             FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write categories"          ON public.categories          FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write tags"                ON public.tags                FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write media"               ON public.media_assets        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write articles"            ON public.cms_articles        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write case studies"        ON public.cms_case_studies    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write article_tags"        ON public.article_tags        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write case_study_tags"     ON public.case_study_tags     FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth write relationships"       ON public.content_relationships FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ---------- STORAGE: editorial-media bucket ----------
INSERT INTO storage.buckets (id, name, public)
VALUES ('editorial-media', 'editorial-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read editorial media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'editorial-media');

CREATE POLICY "Auth upload editorial media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'editorial-media');

CREATE POLICY "Auth update editorial media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'editorial-media');

CREATE POLICY "Auth delete editorial media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'editorial-media');
