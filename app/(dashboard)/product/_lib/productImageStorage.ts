export type StoredProductImage = {
  fileName: string;
  imageDataUrl: string;
};

export type StoredProductGallery = {
  images: StoredProductImage[];
};

const PRODUCT_IMAGE_STORAGE_PREFIX = "product-detail-image:";

function getStorageKey(productCode: string) {
  return `${PRODUCT_IMAGE_STORAGE_PREFIX}${productCode}`;
}

export function readStoredProductGallery(productCode: string): StoredProductGallery | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(getStorageKey(productCode));

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredProductGallery | StoredProductImage;

    if ("images" in parsedValue && Array.isArray(parsedValue.images)) {
      return {
        images: parsedValue.images.filter((image) => Boolean(image?.imageDataUrl)),
      };
    }

    if ("imageDataUrl" in parsedValue && "fileName" in parsedValue) {
      return {
        images: [parsedValue],
      };
    }

    return null;
  } catch {
    window.localStorage.removeItem(getStorageKey(productCode));
    return null;
  }
}

export function saveStoredProductGallery(productCode: string, payload: StoredProductGallery) {
  window.localStorage.setItem(getStorageKey(productCode), JSON.stringify(payload));
}

export function removeStoredProductGallery(productCode: string) {
  window.localStorage.removeItem(getStorageKey(productCode));
}

export function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read image file."));
    };

    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}
