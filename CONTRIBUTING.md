# Contributing to Kinvia

> ### ⚠️ Server-side protection is NOT active yet
>
> `main` and `dev` have no ruleset or branch protection: anyone with write access can
> still push to them directly. Branch rulesets on a **private** repository need
> GitHub Pro, Team or Enterprise (or the repository must be public). Until then the
> local `pre-push` hook and team discipline are the only guards.
>
> **Follow the workflow anyway.** Delete this banner once protection is active.

This is the branch, review and ownership workflow referenced by [`AGENTS.md`](AGENTS.md).

## The one rule

```
  your branch  ──PR──>  dev  ──PR──>  main
```

**Nobody pushes to `main`. Nobody pushes to `dev`.** Both branches accept commits only
through a pull request. Anyone may open, review or merge a PR, including their own.

## One-time setup

```bash
git clone https://github.com/vedantsur09/Kinvia.git kinvia
cd kinvia
./scripts/install-hooks.sh
```

This installs a `pre-push` hook that stops an accidental `git push origin main`. Check
it worked — this command **should fail**:

```bash
git push --dry-run origin HEAD:main
```

## Branches

| Branch | Owner | Purpose |
|---|---|---|
| `main` | PR-only *(protection pending)* | Release. Only receives a PR from `dev`. |
| `dev` | PR-only *(protection pending)* | Integration. Receives member PRs. |
| `aditya` | @adityatadge31 | Personal work branch |
| `prachi` | @prachi-satbhai0741 | Personal work branch |
| `sahil` | @sahilranade45 | Personal work branch |
| `tanvi` | @tanvishinde3010 | Personal work branch |
| `vedant` | @vedantsur09 | Personal work branch |
| `yug` | @Yugu-48 | Personal work branch |

Work on your own branch. For several things in flight, use topic branches under your
name — `tanvi/trust-card`, `yug/speech-adapter`. Do not push to someone else's branch;
open a PR against it instead.

## Contribution flow

```bash
# 1. Start from the latest dev
git switch dev && git pull
git switch -c <your-name>/<topic>     # or: git switch <your-name>

# 2. Work, commit (conventional style)
git add <exact paths>
git commit -m "feat: add objection tagger"

# 3. Push your branch
git push -u origin <your-name>/<topic>

# 4. Open a PR into dev
gh pr create --base dev --fill
```

Fill in the PR template. The maturity, evidence and safety sections are not decoration.

## Releasing to `main`

Only `dev` opens a PR into `main`; the `pr-flow-guard` check fails any other source.

```bash
gh pr create --base main --head dev --title "Release: <what is in it>"
```

Use a **merge commit** for `dev → main`, never a squash, so `dev` does not diverge.
PRs into `dev` may be squashed.

## Reviewing

When you review, check:

- **Honest labels.** planned / prototyped / tested / demonstrated
  ([PROJECT.md](docs/PROJECT.md#maturity-labels)). "Prototyped" presented as
  "demonstrated" is a bug.
- **Grounded figures.** No earnings, placement or progression number shown to users
  unless it comes from the outcome store with a source.
- **No fake data sold as real.** Static or mocked screens must be labelled.
- **AI output was actually read.** Do not merge generated code or text nobody reviewed.
- **Nothing forbidden was committed** (below).

## Never commit

From [privacy.md](docs/privacy.md#3-repository-rules):

- Real learner or parent data, recordings or transcripts
- API keys, tokens or `.env` files
- Model weights or generated binaries
- Local databases

Use synthetic data in `data/samples/` or licensed dummy datasets.

## Adding or removing a team member

Update the branch table above and create or delete their branch. The change lands like
any other: PR into `dev`, then `dev` into `main`.
