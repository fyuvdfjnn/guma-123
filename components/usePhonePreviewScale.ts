import { useEffect, useState } from 'react';

export function usePhonePreviewScale(width: number, height: number, previewWidth: number, previewHeight: number) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return 0.3;
  }

  const widthScale = width > 24 ? (width - 24) / previewWidth : 1;
  const heightScale = height > 24 ? (height - 24) / previewHeight : 1;
  const scale = Math.min(widthScale, heightScale, 1);

  return Number.isFinite(scale) && scale > 0 ? scale : 0.3;
}
