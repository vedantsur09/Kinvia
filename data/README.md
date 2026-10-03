# Kinvia Data

Only **synthetic** data and **organiser-provided dummy datasets** belong in this
repository. Real learner or parent data, recordings and transcripts must never be
committed (see [docs/privacy.md](../docs/privacy.md)); `/data/raw/` and `/data/real/`
are git-ignored for local use.

## `samples/`

| File | Contents |
|---|---|
| `outcomes.sample.csv` | Synthetic trade × provider × district outcomes in the [outcome-store shape](../docs/architecture.md#5-data-model-initial). All values are invented for development and **must not be shown as real figures** |

When the organiser's dummy datasets arrive, add them under `data/organiser/` with a
note of where they came from and their terms of use.
