import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Nexus-AI_owner:K2TM9IFPNtHj@ep-late-resonance-a5qq5jfk.us-east-2.aws.neon.tech/Nexus-AI?sslmode=require',
  },
  verbose: true,
  strict: true,
})