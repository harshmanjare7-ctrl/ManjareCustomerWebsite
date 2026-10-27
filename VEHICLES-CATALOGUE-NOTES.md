# Manjare Vehicles Catalogue

## What's changed
- Added `vehicles.html`, styled to reuse the site's existing fonts, navigation, buttons, colors and footer.
- Changed the homepage fleet call-to-action to **Explore our vehicles**.
- Added three vehicle cards: 2013 Toyota Innova 2.5 E (golden), Maruti Suzuki WagonR (white), and Maruti Suzuki WagonR (brown grey).
- Each card shows one vehicle owned, a passenger-capacity guide, and an enquiry link.
- Vehicle enquiry links open the existing trip enquiry form and prefill the selected vehicle in the trip details field.
- Added illustrative generated images under `public/images/vehicles/`.

## Before publishing
- The current seating figures are listed as up to 7 passengers for the Innova and up to 4 passengers for each WagonR, excluding the driver. Confirm these against each vehicle's registration certificate before publishing as definitive capacity.
- The images are AI-generated illustrative references, not photographs of the actual Manjare vehicles. Replace them with your own photos if you need exact trim, condition and color representation.
- The enquiry form uses the business email configured in `src/main.js` and opens the visitor's email app; it does not send automatically.

## Run locally
1. Install Node.js (compatible with the Vite version in `package.json`).
2. Run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.

The provided archive intentionally omits `node_modules`; dependencies should be installed for the target operating system using `npm install`.
