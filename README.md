# CHM3120 Statistical Data Treatment Interactive Device

Static GitHub Pages app for `CHM3120/Unit2_Section2_StatTests`.

This rebuild follows `Lecture_App_Master_Prompt_and_Workflow.docx` as the governing workflow. The app is an interactive version of Dr. Shafiee's lecture sequence, not a generic statistics calculator collection.

## Lecture Structure

1. Reliability of standard deviation and confidence intervals
2. One-sample Student t test
3. Comparison of two experimental means
4. Paired t test
5. F-test, Q-test, and Grubbs outlier testing
6. One-tailed versus two-tailed decisions
7. Practice lab
8. Slide Studio
9. Class Notes

## Student-Facing Materials

- Original accessible lecture PDF is available for download.
- Original class-note PDF is available for download.
- T-value and F-distribution tables are available for download.
- Word files are not exposed in the student-facing app.
- Slide screenshots are included only as visual references and are paired with extracted text transcripts.
- Practice Problem Set 1 is converted into 58 individual cards with per-card hints and reveal-key buttons.

## Accessibility Work

- Semantic landmarks, one H1, ordered headings, skip link, and real tab roles/states.
- Keyboard navigation for lecture tabs, slide/page browsers, practice cards, and all controls.
- Visible focus styles and reduced-motion support.
- Labeled inputs, selects, textareas, and buttons.
- `aria-live` status regions for calculations and checks.
- Canvas charts have text summaries and accessible data tables.
- Slide and class-note images have matching text transcripts.
- Text-first mode hides visual-heavy content while preserving transcripts, calculations, and practice.

## Verification

- JavaScript syntax check passed.
- Local browser render check passed through `http://127.0.0.1:8765`.
- Desktop DOM accessibility spot check passed: one H1, no unlabeled controls, tab states present, all visible images loaded.
- Practice lab check passed: default statistics focus shows 17 cards; All topics shows 58 cards; hints and reveal keys work.
- Slide and class-note browser check passed through page 41.
- Mobile check at 390px width passed with no horizontal overflow.
