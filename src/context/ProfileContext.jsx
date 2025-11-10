import { createContext, useEffect, useState } from "react";


const ProfileContext = createContext({ profile: "adult", switchProfile: () => {} });


export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(() => {
        return localStorage.getItem("activeProfile") ?? "adult";
    });

    useEffect(() => {
        localStorage.setItem("activeProfile", profile);
    }, [profile]);

    const switchProfile = (value) => setProfile(value);

    return (
        <ProfileContext.Provider value={{ profile, switchProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext