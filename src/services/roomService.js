import { supabase } from './supabase';

export const roomService = {
    // Fetch all rooms with optional filters
    async getRooms(filters = {}) {
        let query = supabase
            .from('rooms')
            .select('*, profiles(full_name, email, phone)')
            .eq('is_available', true)
            .order('created_at', { ascending: false });

        // Apply filters
        if (filters.location) {
            query = query.ilike('location', `%${filters.location}%`);
        }

        if (filters.minPrice) {
            query = query.gte('price', filters.minPrice);
        }

        if (filters.maxPrice) {
            query = query.lte('price', filters.maxPrice);
        }

        if (filters.propertyType) {
            query = query.eq('property_type', filters.propertyType);
        }

        if (filters.tenantPreference) {
            query = query.eq('tenant_preference', filters.tenantPreference);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Get single room by ID
    async getRoom(roomId) {
        const { data, error } = await supabase
            .from('rooms')
            .select('*, profiles(full_name, email, phone)')
            .eq('id', roomId)
            .single();

        if (error) throw error;
        return data;
    },

    // Get rooms by owner
    async getRoomsByOwner(ownerId) {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('owner_id', ownerId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create new room
    async createRoom(roomData) {
        const { data, error } = await supabase
            .from('rooms')
            .insert([roomData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update room
    async updateRoom(roomId, updates) {
        const { data, error } = await supabase
            .from('rooms')
            .update(updates)
            .eq('id', roomId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete room
    async deleteRoom(roomId) {
        const { error } = await supabase
            .from('rooms')
            .delete()
            .eq('id', roomId);

        if (error) throw error;
    },

    // Upload room images
    async uploadImages(files, roomId) {
        const uploadPromises = files.map(async (file, index) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${roomId}/${Date.now()}_${index}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from('room-images')
                .upload(fileName, file);

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('room-images')
                .getPublicUrl(fileName);

            return publicUrl;
        });

        return await Promise.all(uploadPromises);
    },

    // Delete image from storage
    async deleteImage(imagePath) {
        const path = imagePath.split('/room-images/')[1];
        const { error } = await supabase.storage
            .from('room-images')
            .remove([path]);

        if (error) throw error;
    },
};
