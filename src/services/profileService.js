import { supabase } from './supabase';

export const profileService = {
    // Get user profile
    async getProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    },

    // Create profile (called after first signup)
    async createProfile(userId, profileData) {
        const { data, error } = await supabase
            .from('profiles')
            .insert([
                {
                    id: userId,
                    email: profileData.email,
                    full_name: profileData.full_name,
                    role: profileData.role,
                    phone: profileData.phone || null,
                    avatar_url: profileData.avatar_url || null,
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update profile
    async updateProfile(userId, updates) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },
};
