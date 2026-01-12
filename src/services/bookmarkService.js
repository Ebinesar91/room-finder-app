import { supabase } from './supabase';

export const bookmarkService = {
    // Add a bookmark
    async addBookmark(userId, roomId) {
        const { data, error } = await supabase
            .from('bookmarks')
            .insert({ user_id: userId, room_id: roomId })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Remove a bookmark
    async removeBookmark(userId, roomId) {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', userId)
            .eq('room_id', roomId);

        if (error) throw error;
    },

    // Get all bookmarked rooms for a user
    async getBookmarks(userId) {
        const { data, error } = await supabase
            .from('bookmarks')
            .select(`
                *,
                rooms (
                    *,
                    profiles:owner_id (full_name)
                )
            `)
            .eq('user_id', userId);

        if (error) throw error;
        return data.map(bookmark => bookmark.rooms);
    },

    // Check if a room is bookmarked
    async isBookmarked(userId, roomId) {
        const { data, error } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', userId)
            .eq('room_id', roomId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return !!data;
    },

    // Get bookmark count for a room
    async getBookmarkCount(roomId) {
        const { count, error } = await supabase
            .from('bookmarks')
            .select('*', { count: 'exact', head: true })
            .eq('room_id', roomId);

        if (error) throw error;
        return count || 0;
    },
};
