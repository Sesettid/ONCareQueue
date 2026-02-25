# ONCareQueue

**Product Name:** ONCareQueue
**One-line Description:** A real-time, PHIPA-compliant queue management dashboard for Ontario healthcare clinics.

**Team Members:** 
- Dinesh Sesetti (saidinu.sesetti183@gmail.com)

**Live Deployment URL:** https://on-care-queue-wdsd.vercel.app/
**GitHub Repository URL:** https://github.com/Sesettid/ONCareQueue

## The Problem We Solved
Ontario healthcare clinics face severe wait time management issues, leaving patients frustrated in crowded waiting rooms with no visibility into when they will actually be seen. ONCareQueue solves this by providing a real-time, PHIPA-compliant queue management dashboard where clinics can check patients in, and patients can instantly see dynamic, calculated wait times based on live clinic throughput.

## Testing Instructions for Judges
* **Live Database:** The live URL is actively connected to a Supabase PostgreSQL instance via connection pooling.
* **To Seed Data:** If the database is empty when you arrive, navigating to the `/dashboard` will show an "Initialize Demo Environment" button. Click this to instantly create a clinic and populate a sample patient queue.
* **Authentication / Test Account:** You can create an account normally via the Clerk `/sign-up` page to access the Dashboard. Our backend RBAC defaults newly created accounts to "staff" so that you can freely test the mutation features without needing backend admin intervention. Alternatively, you can use our frictionless test account:
  * **Email:** `judge@oncarequeue.com`
  * **Password:** `Hackathon2026!`
* **Public Patient View:** Navigate to `/find-clinic` and click a clinic to view the live public board. Notice that patient names are securely anonymized (e.g. "J. S.") in accordance with PHIPA guidelines!
