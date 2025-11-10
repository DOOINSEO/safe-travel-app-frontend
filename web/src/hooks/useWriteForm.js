import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/boardApi';

export const useWriteForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        country: '',
        region: '',
        category: '',
        content: '',
        images: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await createPost(formData);
            alert('게시물이 성공적으로 작성되었습니다.');
            navigate('/board');
        } catch (err) {
            setError('게시물 작성에 실패했습니다.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { formData, handleChange, handleSubmit, isSubmitting, error };
};