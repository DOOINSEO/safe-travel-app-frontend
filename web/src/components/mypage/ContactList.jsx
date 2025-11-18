import React from 'react';
import { AuthInput } from '../auth/AuthInput';
import { formatPhoneNumber } from '../../utils/formatter';

export default function ContactInput({ phone, onPhoneChange }) {
  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 11) {
      onPhoneChange(numericValue);
    }
  };

  return (
    <section className="mt-5">
      <AuthInput
        id="emergencyPhone"
        label="비상 연락처"
        type="tel"
        placeholder="010-0000-0000"
        value={formatPhoneNumber(phone)}
        onChange={handlePhoneChange}
      />
    </section>
  );
}