import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { profileService } from '../services/profileService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check current session
        authService.getSession().then((session) => {
            if (session?.user) {
                setUser(session.user);
                // Fetch profile
                profileService.getProfile(session.user.id).then((profileData) => {
                    setProfile(profileData);
                    setLoading(false);
                }).catch(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);

                if (session?.user) {
                    try {
                        const profileData = await profileService.getProfile(session.user.id);
                        setProfile(profileData);
                    } catch (error) {
                        console.error('Error fetching profile:', error);
                    }
                } else {
                    setProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return { user, profile, loading };
};
