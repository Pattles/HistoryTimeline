# History Timeline

A hand-curated archive of historically significant dates. Pick any date and see what happened on it.

**Live site:** https://history-timeline-qt6j.onrender.com

*Last modified: Oct 19 2026*

---

## Requirements

- [Node.js](https://nodejs.org/)
- [nodemon](https://nodemon.io/), to restart the server automatically on changes:

```bash
  npm install -g nodemon
```

## Running it locally

1. Open the project folder in Terminal.
2. Install dependencies (first time only):

```bash
   npm install
```

3. Start the server:

```bash
   nodemon server.js
```

   or `npm start`.

4. Open <http://localhost:3000/index.html>.

You're done.

## Configuration

Create a `.env` file in the project root:

```
MONGODB_URI=your-mongodb-connection-string
ADMIN_PASSWORD=your-contribute-password
```

> **Heads up:** if your local `.env` points at the same database as the live site, anything you add or edit locally changes the live site too.

## Troubleshooting

**Something else is already running on port 3000 (Stratum, for example):**

```bash
lsof -ti:3000 | xargs kill
```

Then start the server again.

## Backups

Create a `backups/` folder first, then run:

```bash
curl https://history-timeline-qt6j.onrender.com/api/events > backups/backup_$(date +%Y%m%d).json
```

## Ideas and Improvements
- **Year view graphic.** A month grid for the selected year, with days that have events highlighted and clickable. Revisit at 150 to 200 entries, mostly from 2000 to 2026.
- **Description length limit.** Cap descriptions at 350 characters, with a live counter in the form and a matching check in `validate` on the server.
- **Rewrite the front-end JS.** Turn repeated code into functions, make helpers universal, add JSDoc descriptions to functions so they show up on hover, add comments when the reason isn't obvious, remove old and unused code.


## Notes

- Try to break it. Work on improving it. Up to you.
- Hopefully there are enough comments that it isn't a nightmare to dissect later.
- All the `server.js` stuff was written by Claude, so good luck if you ever decide to change anything. Most of the HTML and CSS is written by yours truly, with some advice-garnering from Claude.
- The first version took 5 hours from start to finish. Was it worth it? Probably not.
