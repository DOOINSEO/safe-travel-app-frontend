import { useState, useEffect } from 'react';

/**
 * @file 값의 변경을 지연시키는 디바운스(Debounce) 커스텀 훅입니다.
 *       이 훅은 API 호출 최적화에 매우 유용합니다.
 */

/**
 * @description 값의 변경을 일정 시간(delay) 지연시켜 반환하는 디바운스 훅입니다.
 *              사용자가 연속적으로 값을 변경(예: 타이핑)하는 동안에는 아무것도 하지 않다가,
 *              사용자가 입력을 멈춘 후 지정된 delay 시간이 지나면 마지막 값을 반환합니다.
 *              이를 통해 불필요한 API 호출이나 무거운 연산을 방지할 수 있습니다.
 *
 * @param {any} value - 디바운싱할 대상 값 (예: 사용자의 텍스트 입력)
 * @param {number} delay - 지연 시간 (밀리초 단위, ms). 기본값은 500ms입니다.
 * @returns {any} 디바운싱이 적용된 값. delay 시간 이후에 업데이트됩니다.
 *
 * @example
 * // 사용 예시 (검색 기능)
 * const [searchTerm, setSearchTerm] = useState('');
 * // searchTerm이 변경된 후 500ms 동안 추가 변경이 없으면 debouncedSearchTerm이 업데이트됩니다.
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // 이 effect는 사용자가 타이핑을 멈춘 후에만 실행됩니다.
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce(value, delay = 500) {
    // 디바운싱된 값을 저장하기 위한 내부 상태입니다.
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // 'value'가 변경된 후, 'delay' 시간만큼 기다렸다가
            // 내부 상태인 'debouncedValue'를 업데이트하는 타이머를 설정합니다.
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // 이 useEffect의 'cleanup' 함수입니다.
            // 다음 'value' 변경이 일어나 effect가 다시 실행되기 직전, 또는 컴포넌트가 언마운트될 때 호출됩니다.
            // 이전에 설정했던 타이머를 취소(clearTimeout)하여, 마지막 타이머만 살아남도록 합니다.
            return () => {
                clearTimeout(handler);
            };
        },
        // 'value' 또는 'delay'가 변경될 때마다 이 effect를 재실행하여 타이머를 재설정합니다.
        [value, delay]
    );

    // 최종적으로 디바운싱된 값을 반환합니다.
    return debouncedValue;
}