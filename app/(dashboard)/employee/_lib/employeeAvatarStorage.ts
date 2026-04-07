export type StoredEmployeeAvatar = {
  fileName: string;
  imageDataUrl: string;
};

const EMPLOYEE_AVATAR_STORAGE_PREFIX = "employee-detail-avatar:";

function getAvatarStorageKey(employeeCode: string) {
  return `${EMPLOYEE_AVATAR_STORAGE_PREFIX}${employeeCode}`;
}

export function readStoredAvatar(employeeCode: string): StoredEmployeeAvatar | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(getAvatarStorageKey(employeeCode));

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredEmployeeAvatar;
  } catch {
    window.localStorage.removeItem(getAvatarStorageKey(employeeCode));
    return null;
  }
}

export function saveStoredAvatar(employeeCode: string, payload: StoredEmployeeAvatar) {
  window.localStorage.setItem(getAvatarStorageKey(employeeCode), JSON.stringify(payload));
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
