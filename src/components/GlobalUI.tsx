'use client';

import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { DevCacheButton } from './DevCacheButton';

export function GlobalUI() {
  const [lang, setLang] = useState('en');

  return (
    <>
      <LanguageSelector lang={lang} setLang={setLang} />
      <DevCacheButton />
    </>
  );
}
