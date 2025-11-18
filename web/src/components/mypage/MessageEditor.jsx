import React from 'react';

export default function MessageEditor({ emergencyMessage, setEmergencyMessage }) {
    return (
        <section className="mt-5 w-full">
            <label htmlFor="emergencyMessage" className="block text-sm font-medium text-gray-700">
                비상 메시지
            </label>
            <textarea
                id="emergencyMessage"
                value={emergencyMessage}
                onChange={(e) => setEmergencyMessage(e.target.value)}
                placeholder="내용을 입력해주세요."
                className="mt-1 block h-[200px] w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
        </section>
    );
}