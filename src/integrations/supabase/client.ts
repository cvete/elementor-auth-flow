// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vbswbnktvfivrmwnqgkt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZic3dibmt0dmZpdnJtd25xZ2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTUyNDgsImV4cCI6MjA2MTQ5MTI0OH0.AFF7jnlxTGeA2-JZ21ZBl_5gxhhwiovv1aPacJrlR-I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);