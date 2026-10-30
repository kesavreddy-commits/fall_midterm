# Margin — English Fall Midterm

Static study site for the English Fall Midterm: study guide, 34-word Vocabulary Lab, flashcards, persistent Cram, close reading, ten original sentences, a comprehensive practice exam, and a separate 79-question exact supplied-question set with AI-inferred study keys.

## GitHub Pages

This is already a Git repository and is ready to publish through GitHub Actions.

1. Create an empty GitHub repository, then add it as `origin` and push `main`.
2. In that repository, open **Settings → Pages** and choose **GitHub Actions** as the publishing source.
3. Every push to `main` runs `.github/workflows/deploy-pages.yml` and publishes `dist/`.

The workflow uses GitHub’s current Pages actions: `configure-pages@v5`, `upload-pages-artifact@v4`, and `deploy-pages@v4`.

```bash
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

Run `node build.mjs` locally to regenerate `dist/index.html`. Source study modules are in `source/site/`; `hosted.js` adapts the static presentation. The original local app in the parent workspace is unchanged.

Progress stays in each visitor’s browser. Back up and restore progress to move it between devices or website addresses. No student data or credentials are committed.

GitHub Pages is static hosting. The top-right ChatGPT button opens ChatGPT’s sign-in page, but it cannot supply ChatGPT-plan grading or authenticated user accounts without a separately authorized backend integration.
