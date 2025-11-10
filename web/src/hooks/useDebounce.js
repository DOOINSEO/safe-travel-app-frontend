import { useState, useEffect } from 'react';

/**
 * 값의 변경을 지연시켜 불필요한 연산을 방지하는 디바운스(Debounce) 커스텀 훅입니다.
 *
 * @template T
 * @param {T} value - 디바운싱할 대상 값
 * @param {number} [delay=500] - 지연 시간 (밀리초)
 * @returns {T} 디바운싱이 적용된 값
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}