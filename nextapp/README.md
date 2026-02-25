# ONCareQueue

A real-time, PHIPA-compliant queue management dashboard for Ontario healthcare clinics.

## Developer Setup
1. Install dependencies: `npm install`
2. Set up your `.env` and `.env.local` using `.env.example`
3. Push database schema: `npx prisma db push`
4. Start development server: `npm run dev`

*Note: To bypass strict RBAC for demo purposes, ensure `DEMO_RBAC=true` is set in your environment variables.*
