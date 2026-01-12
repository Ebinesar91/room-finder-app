import { supabase } from './supabase';

export const analyticsService = {
    // Get owner's complete statistics (SIMPLIFIED - no inquiries)
    async getOwnerStats(ownerId) {
        try {
            // Get total listings
            const { data: rooms, error: roomsError } = await supabase
                .from('rooms')
                .select('*')
                .eq('owner_id', ownerId);

            if (roomsError) throw roomsError;

            // Calculate stats from rooms only
            const totalListings = rooms?.length || 0;
            const activeListings = rooms?.filter(r => r.status === 'active' || !r.status).length || 0;
            const totalViews = rooms?.reduce((sum, room) => sum + (room.views || 0), 0) || 0;
            const totalRevenue = rooms?.filter(r => r.status === 'active' || !r.status)
                .reduce((sum, room) => sum + (room.price || 0), 0) || 0;

            return {
                totalListings,
                activeListings,
                totalViews,
                totalRevenue,
                totalInquiries: 0, // Default to 0 for now
            };
        } catch (error) {
            console.error('Error getting owner stats:', error);
            // Return defaults on error
            return {
                totalListings: 0,
                activeListings: 0,
                totalViews: 0,
                totalRevenue: 0,
                totalInquiries: 0,
            };
        }
    },

    // Get inquiries for owner (SIMPLIFIED - return empty if fails)
    async getOwnerInquiries(ownerId) {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select(`
                    *,
                    rooms!inner (
                        id,
                        title,
                        owner_id
                    ),
                    profiles:finder_id (
                        full_name,
                        email
                    )
                `)
                .eq('rooms.owner_id', ownerId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.log('Inquiries not available:', error);
            return []; // Return empty array if table doesn't exist
        }
    },

    // Track room view
    async trackRoomView(roomId) {
        try {
            const { data: room } = await supabase
                .from('rooms')
                .select('views')
                .eq('id', roomId)
                .single();

            await supabase
                .from('rooms')
                .update({ views: (room?.views || 0) + 1 })
                .eq('id', roomId);
        } catch (error) {
            console.log('View tracking not available:', error);
        }
    },

    // Get room views
    async getRoomViews(roomId) {
        try {
            const { data, error } = await supabase
                .from('rooms')
                .select('views')
                .eq('id', roomId)
                .single();

            if (error) throw error;
            return data?.views || 0;
        } catch (error) {
            console.log('Views not available:', error);
            return 0;
        }
    },

    // Get inquiries for a specific room
    async getRoomInquiries(roomId) {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select(`
                    *,
                    profiles:finder_id (
                        full_name,
                        email,
                        phone
                    )
                `)
                .eq('room_id', roomId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.log('Room inquiries not available:', error);
            return [];
        }
    },

    // Create inquiry
    async createInquiry(roomId, finderId, message, contactInfo) {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .insert({
                    room_id: roomId,
                    finder_id: finderId,
                    message,
                    contact_info: contactInfo,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating inquiry:', error);
            throw error;
        }
    },

    // Update inquiry status
    async updateInquiryStatus(inquiryId, status) {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .update({ status })
                .eq('id', inquiryId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating inquiry:', error);
            throw error;
        }
    },
};
