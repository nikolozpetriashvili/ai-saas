'use client'

import { useEffect } from "react";
import {Crisp} from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c843fb3b-32fb-481c-a7df-2dfcef63e9b")
  },[])

  return null;
}

