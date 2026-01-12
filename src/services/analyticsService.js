import { supabase } from './supabase';

export const analyticsService = {
    // Get owner's complete statistics
    async getOwnerStats(ownerId) {
        // Get total listings
        const { data: rooms, error: roomsError } = await supabase
            .from('rooms')
            .select('*')
            .eq('owner_id', ownerId);

        if (roomsError) throw roomsError;

        // Calculate stats
        const totalListings = rooms.length;
        const activeListings = rooms.filter(r => r.status === 'active').length;
        const totalViews = rooms.reduce((sum, room) => sum + (room.views || 0), 0);
        const totalRevenue = rooms
            .filter(r => r.status === 'active')
            .reduce((sum, room) => sum + (room.price || 0), 0);

        // Get total inquiries
        const { count: inquiryCount } = await supabase
            .from('inquiries')
            .select('*', { count: 'exact', head: true })
            .in('room_id', rooms.map(r => r.id));

        return {
            totalListings,
            activeListings,
            totalViews,
            totalRevenue,
            totalInquiries: inquiryCount || 0,
        };
    },

    // Track room view
    async trackRoomView(roomId) {
        const { data, error } = await supabase.rpc('increment_room_views', {
            room_id: roomId,
        });

        if (error) {
            // Fallback if RPC doesn't exist
            const { data: room } = await supabase
                .from('rooms')
                .select('views')
                .eq('id', roomId)
                .single();

            await supabase
                .from('rooms')
                .update({ views: (room?.views || 0) + 1 })
                .eq('id', roomId);
        }

        return data;
    },

    // Get room views
    async getRoomViews(roomId) {
        const { data, error } = await supabase
            .from('rooms')
            .select('views')
            .eq('id', roomId)
            .single();

        if (error) throw error;
        return data.views || 0;
    },

    // Get inquiries for owner
    async getOwnerInquiries(ownerId) {
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
        return data;
    },

    // Get inquiries for a specific room
    async getRoomInquiries(roomId) {
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
        return data;
    },

    // Create inquiry
    async createInquiry(roomId, finderId, message, contactInfo) {
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
    },

    // Update inquiry status
    async updateInquiryStatus(inquiryId, status) {
        const { data, error } = await supabase
            .from('inquiries')
            .update({ status })
            .eq('id', inquiryId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Get performance data for charts
    async getPerformanceData(ownerId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data, error } = await supabase
            .from('inquiries')
            .select(`
                created_at,
                rooms!inner (owner_id)
            `)
            .eq('rooms.owner_id', ownerId)
            .gte('created_at', startDate.toISOString());

        if (error) throw error;

        // Group by date
        const grouped = data.reduce((acc, item) => {
            const date = new Date(item.created_at).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(grouped).map(([date, count]) => ({
            date,
            inquiries: count,
        }));
    },
};
