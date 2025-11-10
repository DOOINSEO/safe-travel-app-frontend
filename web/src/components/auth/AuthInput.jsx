import React from 'react';

/**
 * @description 인증 폼에서 사용되는 레이블과 입력창 세트입니다.
 *              비활성화(disabled) 상태일 때도 테두리를 유지하고 배경색만 변경하여
 *              일관된 UI를 제공합니다.
 */
export const AuthInput = React.forwardRef(({ id, label, ...props }, ref) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                ref={ref}
                className="mt-1 block h-[48px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400
                           focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500
                           disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                required
                {...props}
            />
        </div>
    );
});