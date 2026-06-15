import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eycjeuuxgqfzomegqczn.supabase.co/rest/v1/';
const supabaseAnonKey = 'sb_publishable_oDuelOFHl6dsi1qPGg7FCQ_wU9Pi7xJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);