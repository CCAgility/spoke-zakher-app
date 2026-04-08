'use client';

import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { DevCacheButton } from './DevCacheButton';

export function GlobalUI() {
  return (
    <>
      <LanguageSelector />
      <DevCacheButton />
    </>
  );
}
