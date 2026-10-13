# CAT-CAT Calculator / CAT-CAT 计算机

A browser-local CAT-CAT scoring prototype in Traditional Chinese, Simplified Chinese, English, Japanese, and Arabic.

## Use

Choose a synthetic example or create a blank case. Enter assessed case features, review the total and item contributions, and compare changed inputs. Measurement reports can be read locally, reviewed, and applied to matching fields; missing features require manual completion. OCR does not measure radiographic landmarks.

Cases and drafts stay in the current browser. To transfer records from the former Sites address, export the case backup there and restore it at the GitHub Pages address. Changing the website origin does not automatically transfer browser storage.

## Scoring

The item-score adaptation is based on Long et al., BMC Oral Health 2020;20:312, Table 1. DOI: https://doi.org/10.1186/s12903-020-01300-6 (CC BY 4.0). The Methods page documents scoring boundaries and terminology references. The total has no fixed maximum; this prototype does not assign universal low/medium/high difficulty bands or claim trained prediction performance. Verify clinical inputs and source measurements.

## Publish

1. Create a public GitHub repository named `cat-cat` and upload these files on `main`.
2. Set **Settings → Pages → Source → GitHub Actions**.
3. The `Deploy CAT-CAT to GitHub Pages` workflow verifies and publishes `dist/`.

The workflow can also be run manually in Actions. The live URL is supplied by the deployment job. Dependencies and OCR language data are bundled locally; their upstream licenses remain under `dist/vendor/`. Source host configuration and patient uploads are not part of this repository.

## Assessment reports

Use **Report / PDF** to preview a table report, then choose **Save PDF / Print** and save it as PDF in the browser print dialog. Reports include case inputs, item scores, domain subtotals, reference comparisons and imported measurement sources. JSON export remains available for data backup. Reports are generated locally and support all five interface languages.
