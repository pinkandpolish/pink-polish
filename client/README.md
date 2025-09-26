This folder contains the front-end (Vite + React) for Halo Redesign.

To build locally:

```bash
cd client
npm install
npm run build
```

Vercel setup:
- Import this repository into Vercel.
- Project Root: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
Formspree setup
- Add Environment Variables in your hosting (Vercel):
	- `VITE_FORMSPREE_ENDPOINT` = `https://formspree.io/f/xandzwgo` (used for the contact form)
	- `VITE_BOOKING_ENDPOINT` = `https://formspree.io/f/xandzwgo` (used for the booking / booking form)

After deployment, verify the contact form submits through Formspree.
