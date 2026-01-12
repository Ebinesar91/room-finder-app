import { useState, useEffect } from 'react';
import { bookmarkService } from '../../services/bookmarkService';
import './BookmarkButton.css';

export const BookmarkButton = ({ roomId, userId, className = '' }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkBookmarkStatus();
    }, [roomId, userId]);

    const checkBookmarkStatus = async () => {
        if (!userId) return;
        try {
            const status = await bookmarkService.isBookmarked(userId, roomId);
            setIsBookmarked(status);
        } catch (error) {
            console.error('Error checking bookmark:', error);
        }
    };

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId) {
            alert('Please login to save rooms');
            return;
        }

        setLoading(true);
        try {
            if (isBookmarked) {
                await bookmarkService.removeBookmark(userId, roomId);
                setIsBookmarked(false);
            } else {
                await bookmarkService.addBookmark(userId, roomId);
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            alert('Failed to update bookmark');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''} ${className}`}
            onClick={handleToggle}
            disabled={loading}
            title={isBookmarked ? 'Remove from saved' : 'Save room'}
        >
            <svg
                className="bookmark-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
        </button>
    );
};
