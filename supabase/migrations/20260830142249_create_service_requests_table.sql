/*
# Create service_requests table (single-tenant, no auth)

1. New Tables
- `service_requests`
  - `id` (uuid, primary key)
  - `category_id` (text, not null) — e.g. "android-mobily"
  - `category_name` (text, not null) — display name of the category
  - `subcategory_id` (text, not null) — e.g. "android-hlavne"
  - `subcategory_name` (text, not null) — display name of the subcategory
  - `service_id` (text, not null) — e.g. "zvysenie-verzie-androidu"
  - `service_name` (text, not null) — display name of the service
  - `answers` (jsonb, not null default '{}') — map of question id → answer
  - `description` (text, not null default '') — free-text description from the user
  - `speed` (text, not null default 'standard') — standard | fast | express | priority
  - `material` (text, not null default 'self') — self | needed
  - `risk_accepted` (boolean, not null default false) — user confirmed risk warning
  - `files` (jsonb, not null default '[]') — array of file names the user attached
  - `status` (text, not null default 'pending') — pending | contacted | completed | cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `service_requests`.
- Allow anon + authenticated CRUD because this is a single-tenant app with no sign-in.
  Anyone visiting the site can submit a service request; that is the intended behavior.

3. Notes
- The `answers` jsonb column stores the dynamic per-service form responses.
- The `files` array stores only file names (no binary data) since actual file
  storage can be added later via Supabase Storage.
- The `status` column is prepared for future admin/order-tracking features.
*/

CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id text NOT NULL,
  category_name text NOT NULL,
  subcategory_id text NOT NULL,
  subcategory_name text NOT NULL,
  service_id text NOT NULL,
  service_name text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text NOT NULL DEFAULT '',
  speed text NOT NULL DEFAULT 'standard',
  material text NOT NULL DEFAULT 'self',
  risk_accepted boolean NOT NULL DEFAULT false,
  files jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_requests" ON service_requests;
CREATE POLICY "anon_select_requests" ON service_requests FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_requests" ON service_requests;
CREATE POLICY "anon_insert_requests" ON service_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_requests" ON service_requests;
CREATE POLICY "anon_update_requests" ON service_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_requests" ON service_requests;
CREATE POLICY "anon_delete_requests" ON service_requests FOR DELETE
  TO anon, authenticated USING (true);
