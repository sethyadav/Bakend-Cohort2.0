
import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children}) => {
    const [ song, setSong ] = useState({
       
        "url": "https://ik.imagekit.io/wzul6hgil/Soldier_Soldier_-_Lyrical___Bobby_Deol__Preity_Zinta___Kumar_Sanu__Alka_Yagnik___Soldier_Movie_Songs_6CWElnsl-4.mp3",
        "posterUrl": "https://ik.imagekit.io/wzul6hgil/cohort-2/moodify/posters/Soldier_Soldier_-_Lyrical___Bobby_Deol__Preity_Zinta___Kumar_Sanu__Alka_Yagnik___Soldier_Movie_Songs_mPtEB5Q_7.jpeg",
        "title": "Soldier Soldier - Lyrical | Bobby Deol, Preity Zinta | Kumar Sanu, Alka Yagnik | Soldier Movie Songs",
        "mood": "happy",
    })

    const [ loading, setLoading ] = useState(false)

    return (
        <SongContext.Provider
          
            value={{loading, setLoading, song, setSong}}   
        >
            {children}
        </SongContext.Provider>
    )

}