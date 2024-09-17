import { createContext } from "react";
import type { User } from '@supabase/supabase-js'

interface AppContextType {
    user?: User | null
}

export const AppContext = createContext<AppContextType | null>({});