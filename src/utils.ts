import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://jmqdyeprsomkiojkjjex.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcWR5ZXByc29ta2lvamtqamV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzOTAwNzUsImV4cCI6MjA0MTk2NjA3NX0.uiWfuJPhKLG6YQSM54bLmCVgG8_PrXrrleMoYDPsNbM");

export {
    supabase
}