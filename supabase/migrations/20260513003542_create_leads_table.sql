/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required) - contact full name
      - `company` (text) - company name
      - `project_type` (text) - Residential, Commercial, or Industrial
      - `message` (text) - project details/message
      - `created_at` (timestamptz) - submission timestamp

  2. Security
    - Enable RLS on `leads` table
    - Add INSERT policy for anonymous users (public form submission)
    - No SELECT policy for public (data only visible to authenticated admin)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);
