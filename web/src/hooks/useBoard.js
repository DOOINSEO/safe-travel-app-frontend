import { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../services/boardApi';

export const useBoard = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        country: null,
        region: null,
        category: '최신순',
    });

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getPosts(filters);
            setPosts(data);
        } catch (err) {
            setError('게시물을 불러오는데 실패했습니다.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    return { posts, isLoading, error, filters, handleFilterChange, refetch: fetchPosts };
};