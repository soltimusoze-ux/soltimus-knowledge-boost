# Case Study Visual Direction

_Phase 6E — Realistic Case Study Visual Upgrade._

## Visual philosophy

Soltimus case-study imagery is **engineering documentary photography**,
not marketing photography. Every hero image must look like it could
plausibly have been taken on-site by a competent architectural / editorial
photographer documenting a real Polish project.

The viewer should think: _"this is a real house, in a real place, in
Poland, with a real system"_ — not _"this is a render"_ and not _"this is
a luxury villa stock photo"_.

## Realism standards

A hero image qualifies for `/realizacje` only when it meets all of:

1. **Believable scale.** Single-family, mid-rise multi-family, or commercial
   — at a size that matches the case study text. No oversized estates.
2. **Authentic regional architecture.** Polish suburban / countryside /
   municipal vocabulary: kostka PRL, nowoczesna stodoła, parterowiec,
   bloki 4–5 kondygnacji, czerwone i grafitowe dachy, tynk akrylowy,
   białe PCV, ogrodzenia panelowe / siatka. No California ranch, no
   alpine chalet, no Mediterranean villa.
3. **Restrained light.** Soft overcast or warm cloudy golden hour.
   No fake HDR, no neon sunsets, no studio rim-lighting outdoors.
4. **Natural color grading.** Slightly cinematic, low saturation,
   architectural-photography palette. Greens look like Polish grass in
   May — not tropical.
5. **Documentary framing.** Wide enough to read the building in context
   (plot, fence, neighbours, sky). No overproduced symmetry, no drone
   showreel angles unless the story is infrastructure-scale.
6. **Engineering visible, not staged.** PV panels integrate with the
   roof, monoblocs sit where they would actually sit, copper piping
   reads as installed not styled.

## Regional authenticity principles

- **Houses look lived in.** Mown but not perfect lawn, real fences,
  modest landscaping, sometimes a neighbour's roof visible.
- **Facades match era + budget.** A 1970s "kostka" after termo-
  modernization is white/cream + subtle gray accents, not a designer
  black box. A new build is allowed to be more refined.
- **Cars, paths, antennas, gutters exist.** Removing them is what makes
  renders look fake.
- **Climate reads as PL.** Soft sky, slightly hazy, deciduous trees,
  no palm trees, no extreme blue Mediterranean sea light.

## Image selection rules (going forward)

When adding a new case study, choose / generate an image as follows:

1. Start from the building profile: type, era, area, location. Match the
   image to that profile before considering aesthetics.
2. Prefer real on-site photography. AI generation is acceptable only when
   on-site photography is unavailable AND the prompt enforces all
   realism standards above.
3. Store generated assets in `src/assets/case-*.jpg` and import them.
   Do not link to unsplash CDN URLs for case heroes — they are generic
   and they break the regional authenticity promise.
4. Always set a descriptive `heroImageAlt` that names the building type
   in Polish. This is both an SEO and accessibility requirement.
5. Verify legibility: hero text uses a top-to-bottom gradient overlay
   (`from-black via-black/60 to-black/20`). Re-check on mobile that the
   title and eyebrow remain AA-contrast over the image's bottom band.

## What to avoid (hard rules)

- ❌ Generic glass-and-steel modernist villas
- ❌ California / Mediterranean / Scandinavian holiday-home aesthetics
- ❌ Fake HDR, neon sky, oversaturated green grass, plastic-looking trees
- ❌ "Marketing render" symmetry and emptiness
- ❌ Promotional product placement (Soltimus van parked in front, big
  logos on walls, oversized branded workwear). Branding may appear
  only as it would in real life — small, embroidered, on a cap or
  jacket; never billboard-scale.
- ❌ Reusing the same Unsplash photo across multiple case studies
- ❌ Anything that contradicts the body copy (e.g. "modest suburban
  plot" with a hero showing a 1,500 m² estate)

## Per-case decisions applied in Phase 6E

| Case | Hero |
| --- | --- |
| `dom-nowy-hybryda-kominek-pompa-ciepla` | Nowoczesna stodoła, grafitowy dach, zintegrowane PV, wieczór, łąka — `case-stodola-hero.jpg` |
| `dom-lat-70-gleboka-termomodernizacja-pompa-ciepla` | Kostka PRL po termomodernizacji, jasna elewacja z szarymi akcentami, podmiejska Polska — `case-kostka-prl-hero.jpg` |
| `osiedle-252-mieszkania-pompy-gruntowe` | Drone shot polskiego osiedla średnio-wysokiego po modernizacji, zieleń, place zabaw — `case-osiedle-hero.jpg` |
| `dom-2000-naprawa-instalacji-daikin` | Inżynier serwisowy przy Daikin Altherma, czapka z subtelnie wyhaftowanym SOLTIMUS — `case-daikin-engineer-hero.jpg` |

## UX guardrails

- Hero overlay gradient (`CaseHero.tsx`) must remain — do not reduce its
  opacity below `from-black via-black/60`. It is the single point of
  AA-contrast protection for the title.
- Image `object-cover` + `opacity-65` is intentional and keeps the
  cinematic tone. Do not raise opacity above 75 without re-testing
  mobile legibility.
- Card thumbnails on `/realizacje` use the same hero asset — pick images
  whose bottom-third works under a black gradient (where the card
  caption sits).
