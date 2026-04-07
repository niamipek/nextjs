"use client";

import Image from "next/image";
import { useActionState, useEffect, useId, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAvatarAction, updateProfileAction, type UpdateProfileState } from "../actions";

type ProfilePageClientProps = {
  initials: string;
  fullName: string;
  heroEmail: string;
  avatarUrl: string | null;
  fields: Array<{
    key: string;
    label: string;
    value: string;
    editable: boolean;
  }>;
};

type AvatarToast = {
  tone: "success" | "error";
  title: string;
  message: string;
};

const initialState: UpdateProfileState = {
  success: false,
  message: "",
  fieldErrors: {},
};

function validatePhoneNumber(value: string) {
  if (!value.trim()) {
    return "Phone number khong duoc de trong.";
  }

  if (!/^\d+$/.test(value)) {
    return "Phone number chi duoc chua chu so.";
  }

  if (value.length < 10 || value.length > 11) {
    return "Phone number phai co 10 hoac 11 chu so.";
  }

  return "";
}

function validateEmail(value: string) {
  if (!value.trim()) {
    return "Email khong duoc de trong.";
  }

  if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value.trim().toLowerCase())) {
    return "Email phai dung dinh dang ten@gmail.com.";
  }

  return "";
}

export function ProfilePageClient({
  initials,
  fullName,
  heroEmail,
  avatarUrl,
  fields,
}: ProfilePageClientProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);
  const [isEditing, setIsEditing] = useState(false);
  const phoneFieldValue = fields.find((field) => field.key === "phoneNumber")?.value ?? "";
  const emailFieldValue = fields.find((field) => field.key === "email")?.value ?? "";
  const [phoneNumber, setPhoneNumber] = useState(phoneFieldValue);
  const [email, setEmail] = useState(emailFieldValue);
  const [clientErrors, setClientErrors] = useState<{ phoneNumber?: string; email?: string }>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  const [avatarToast, setAvatarToast] = useState<AvatarToast | null>(null);
  const [, startTransition] = useTransition();
  const [isUploadingAvatar, startAvatarTransition] = useTransition();
  const avatarInputId = useId();

  useEffect(() => {
    setPhoneNumber(phoneFieldValue);
    setEmail(emailFieldValue);
  }, [emailFieldValue, phoneFieldValue]);

  useEffect(() => {
    setAvatarPreview(avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    if (!avatarToast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAvatarToast(null);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [avatarToast]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    setIsEditing(false);
    startTransition(() => {
      router.refresh();
    });
  }, [router, state.success, startTransition]);

  const handleCancel = () => {
    setPhoneNumber(phoneFieldValue);
    setEmail(emailFieldValue);
    setClientErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors = {
      phoneNumber: validatePhoneNumber(phoneNumber),
      email: validateEmail(email),
    };

    if (nextErrors.phoneNumber || nextErrors.email) {
      event.preventDefault();
      setClientErrors({
        phoneNumber: nextErrors.phoneNumber || undefined,
        email: nextErrors.email || undefined,
      });
      return;
    }

    setClientErrors({});
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target;
    const file = inputElement.files?.[0];

    if (!file) {
      return;
    }

    const submitFormData = new FormData();
    submitFormData.set("avatar", file);

    startAvatarTransition(async () => {
      const result = await updateAvatarAction(submitFormData);

      if (result.success) {
        setAvatarPreview(result.avatarUrl || avatarUrl || null);
        setAvatarToast({
          tone: "success",
          title: "Success!",
          message: result.message,
        });
        router.refresh();
      } else {
        setAvatarToast({
          tone: "error",
          title: "Upload failed",
          message: result.message,
        });
      }

      inputElement.value = "";
    });
  };

  return (
    <section className="dashboard-content-shell">
      <article className="profile-card">
        <div className="profile-hero" />

        <div className="profile-card-body">
          <form action={formAction} onSubmit={handleSubmit}>
            <div className="profile-summary-row">
              <div className="profile-identity">
                <div className="profile-avatar-stack">
                  <div className="profile-avatar-shell">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt={`${fullName} avatar`}
                        fill
                        sizes="94px"
                        className="profile-avatar-photo"
                      />
                    ) : (
                      <div className="profile-avatar-image" aria-hidden="true">
                        {initials}
                      </div>
                    )}
                  </div>
                  <label htmlFor={avatarInputId} className="profile-avatar-upload-button">
                    {isUploadingAvatar ? "Uploading..." : "Update photo"}
                  </label>
                  <input
                    id={avatarInputId}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    className="profile-avatar-input"
                    onChange={handleAvatarChange}
                    disabled={isUploadingAvatar}
                  />
                </div>

                <div className="profile-identity-copy">
                  <h1 className="profile-name">{fullName}</h1>
                  <p className="profile-email">{heroEmail}</p>
                </div>
              </div>

              <div className="profile-edit-actions">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="profile-edit-button profile-edit-button-secondary"
                      onClick={handleCancel}
                      disabled={isPending}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="profile-edit-button" disabled={isPending}>
                      {isPending ? "Saving..." : "Save"}
                    </button>
                  </>
                ) : (
                  <button type="button" className="profile-edit-button" onClick={() => setIsEditing(true)}>
                    Edit
                  </button>
                )}
              </div>
            </div>

            {state.message ? (
              <p className={`profile-edit-status${state.success ? " is-success" : " is-error"}`}>{state.message}</p>
            ) : null}

            <div className="profile-form-grid">
              {fields.map((field) => {
                const isEditableField = field.editable && isEditing;
                const inputValue =
                  field.key === "phoneNumber" ? phoneNumber : field.key === "email" ? email : field.value;

                return (
                  <label key={field.key} className="profile-field">
                    <span className="profile-field-label">{field.label}</span>
                    <span className={`profile-input-shell${isEditableField ? " is-editable" : ""}`}>
                      <input
                        className="profile-input"
                        type="text"
                        name={field.editable ? field.key : undefined}
                        value={inputValue}
                        readOnly={!isEditableField}
                        onChange={
                          field.key === "phoneNumber"
                            ? (event) => {
                                setPhoneNumber(event.target.value);
                                setClientErrors((current) => ({ ...current, phoneNumber: undefined }));
                              }
                            : field.key === "email"
                              ? (event) => {
                                  setEmail(event.target.value);
                                  setClientErrors((current) => ({ ...current, email: undefined }));
                                }
                              : undefined
                        }
                      />
                    </span>
                    {field.key === "phoneNumber" && (clientErrors.phoneNumber || state.fieldErrors?.phoneNumber) ? (
                      <span className="profile-field-error">
                        {clientErrors.phoneNumber || state.fieldErrors?.phoneNumber}
                      </span>
                    ) : null}
                    {field.key === "email" && (clientErrors.email || state.fieldErrors?.email) ? (
                      <span className="profile-field-error">{clientErrors.email || state.fieldErrors?.email}</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </form>

          <section className="profile-email-section" aria-labelledby="profile-email-heading">
            <h2 id="profile-email-heading" className="profile-section-title">
              My email Address
            </h2>

            <div className="profile-email-list">
              <div className="profile-email-item">
                <span className="profile-email-icon" aria-hidden="true">
                  <span className="profile-email-icon-envelope" />
                </span>

                <div className="profile-email-copy">
                  <p className="profile-email-address">{heroEmail}</p>
                  {/* <p className="profile-email-time">Linked since {emailLinkedSince}</p> */}
                </div>
              </div>
            </div>

            {/* <button type="button" className="profile-add-email-button">
              +Add Email Address
            </button> */}
          </section>
        </div>
      </article>
      {avatarToast ? (
        <div className={`profile-toast profile-toast-${avatarToast.tone}`} role="status" aria-live="polite">
          <span className="profile-toast-accent" aria-hidden="true" />
          <div className="profile-toast-content">
            <span className="profile-toast-icon" aria-hidden="true">
              {avatarToast.tone === "success" ? "✓" : "!"}
            </span>
            <div className="profile-toast-copy">
              <p className="profile-toast-title">{avatarToast.title}</p>
              <p className="profile-toast-message">{avatarToast.message}</p>
            </div>
          </div>
          <button
            type="button"
            className="profile-toast-close"
            onClick={() => setAvatarToast(null)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ) : null}
    </section>
  );
}
