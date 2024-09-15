import { useEffect } from 'react';
import './App.css'
import { supabase } from '@/utils';

function App() {
  async function fetchCountry() {
    const { data } = await supabase.from("countries").select();

    console.log(data, "RESPONSE")
  }
  
  useEffect(() => {
    fetchCountry()
  }, [])
  return (
    <>
      
    </>
  )
}

export default App
