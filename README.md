# Student Portfolio & Academic Management Website

Built for: CSC 106 — Introduction to Web Technologies, Term Project
Student: Abdullah, Miva Open University

## What this is

A 5-page responsive website: Home, About, Projects, Academic Planner, Contact.
Plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Files

```
portfolio/
  index.html       Home page
  about.html       About Me page
  projects.html    Projects page
  planner.html     Academic Planner (interactive task manager)
  contact.html     Contact form with validation
  css/style.css    All styling, one file
  js/main.js       Shared nav toggle (mobile menu)
  js/planner.js    Task add / complete / delete logic
  js/contact.js    Contact form validation
  images/          Photos and screenshots (currently placeholders)
```

## Before you submit — replace the placeholders

1. **Photo**: swap `images/profile.jpg` for an actual photo of yourself, same filename, roughly portrait orientation (4:5).
2. **Project screenshots**: replace `project-triangle.jpg`, `project-palindrome.jpg`, `project-portfolio.jpg` with real screenshots of your work.
3. **Project links**: in `projects.html`, change the `href="https://github.com/"` links to your actual GitHub repo links for each project.
4. **Video**: `projects.html` references `images/demo.mp4`. Either add a short screen recording of the planner with that filename, or remove the `<video>` block if you'd rather skip it (you already have other multimedia coverage if you add one audio/video element somewhere).
5. **Contact details**: update the email address in `contact.html` (currently `abdullah@example.edu.ng`).
6. **Bio and skill levels**: the percentages on the About page are placeholders — adjust them to reflect your actual comfort level with each skill.

## How to run it locally

No installation needed. Open `index.html` directly in a browser, or for a closer-to-production experience, serve it with a simple local server:

```
cd portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## How to host it (free options)

**GitHub Pages** (recommended, pairs naturally with the GitHub repo requirement):
1. Push this folder to a GitHub repository.
2. In the repo, go to Settings → Pages.
3. Set the source branch to `main` and folder to `/ (root)`.
4. Your site will be live at `https://yourusername.github.io/repo-name/`.

**Netlify**: drag and drop the `portfolio` folder onto netlify.com/drop for an instant live link.

## What each JS file actually does

- `main.js` — toggles the mobile navigation menu open/closed.
- `planner.js` — keeps tasks in a JavaScript array, builds the task list rows with DOM methods (no innerHTML string-building for task content, to avoid injection issues), and recalculates the total/pending/completed counts whenever the list changes.
- `contact.js` — validates each field on blur and again on submit: checks for empty fields, checks email format with a regular expression, and checks the phone field contains digits only.

## Submission checklist

- [ ] Replace placeholder images and content as listed above
- [ ] Push the folder to a GitHub repository
- [ ] Enable GitHub Pages (or deploy to Netlify) and get the live link
- [ ] Submit both the GitHub repo link and the live site link

# CSC-106-portfolio-lab-assessment
