// supabaseClient.js



import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://larwwujxqqdbwulkghcc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhcnd3dWp4cXFkYnd1bGtnaGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwODA2NjQsImV4cCI6MjA0MDY1NjY2NH0.n8BkDb2LvNZh_dGZWGIhr1JaWMwrgAWWMw9XMSnfG7o'; // SupabaseのAnon Key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)