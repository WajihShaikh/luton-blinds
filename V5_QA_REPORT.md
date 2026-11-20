# Luton Blinds V5 | Quality assurance report

## Source and design review

The V4 ZIP was opened and reviewed as the basis for V5. Actual CSS and HTML were inspected rather than inventing issues based on screenshots alone. The largest recurring issues were old and new styling layers overlapping, photo cards appearing as generic beige blocks, mobile/tablet layout inconsistencies, and multiple competing reveal-animation systems.

## Checks completed

| Check | Result |
|---|---|
| Independent HTML pages | 29 present |
| Browser-rendered viewport checks | 145 (29 pages × 320, 390, 768, 1024 and 1440px) |
| Document-level horizontal overflow | None detected in those viewport checks |
| JavaScript runtime errors | None detected in those viewport checks |
| Parent section heading alignment | Centred across checked pages |
| Image files referenced | 422 |
| Duplicate client image path references across pages | 0 |
| Missing local image files | 0 |
| Missing local HTML destination files | 0 |
| Image file integrity | 422/422 passed Pillow image-file verification |
| V5 CSS syntax errors | 0 using tinycss2 stylesheet parsing |
| V5 JavaScript syntax check | Passed Node.js syntax verification |
| Desktop mega menu | Opens, shows links and closes via Escape |
| Mobile navigation | Opens and closes via Escape |
| FAQ | Animated open and close in normal-motion mode |
| Booking method tabs | Both modes switch displayed content |

Browser testing used a local file-resource route to load the same HTML/CSS/JS/assets into a headless browser. This validates the rendered frontend, but **is not production deployment testing**.

## Client photos

All 422 image references point to unique client asset files. A different source image was selected for the homepage Blinds and Curtains collection cards where the previous imagery mismatched the label. There are still many visually similar installations throughout the archive, so a product-by-product content approval is recommended before launch. A unique filename does not guarantee a unique photo scene.

## Outstanding before production

- Confirm the final 25-page contractual allocation and the extra four utility/page previews.
- Connect real booking availability and appointment rules; the prototype's calendar is not live.
- Configure and test actual email delivery and form submissions.
- Integrate reviews with clear business attribution and the client's permission.
- Confirm all product images, variants, safety statements, warranty terms and legal text.
- Complete QA on the final WordPress/Elementor implementation, including accessibility, performance and server-side behaviour.
