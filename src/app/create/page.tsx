"use client";
import React, { useState, useRef } from "react";
import styles from "./createhousehold.module.css";
import EmailModal from "./emailmodal";
import {
  ERROR_MAX_EMAILS,
  getErrorDuplicateEmail,
  getErrorInvalidEmail,
  EMAIL_VALIDATION_PATTERN,
  HOUSEHOLD_SIZES,
} from "../constants/constants";

export default function CreateHouseHold() {
  const [emails, setEmails] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEmailError(null);
    }
  };

  const handleInvite = () => {
    if (!emailInputRef.current) return;
    const emailValue = emailInputRef.current.value;

    if (emails.length >= 4) {
      setEmailError(ERROR_MAX_EMAILS);
      return;
    }

    if (emails.includes(emailValue)) {
      setEmailError(getErrorDuplicateEmail(emailValue));
      return;
    }

    if (
      emailValue.match(EMAIL_VALIDATION_PATTERN) &&
      !emails.includes(emailValue)
    ) {
      setEmails((prev) => [...prev, emailValue]);
      emailInputRef.current.value = "";
      setEmailError(null);
    } else {
      setEmailError(
        `${emailValue} is an invalid email, please enter a valid email.`
      );
    }
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToDelete));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Create Household</div>
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter household name"
          className={styles.input}
        />
        <select className={styles.select} defaultValue="">
          {HOUSEHOLD_SIZES.map((size) => (
            <option
              key={size.value}
              value={size.value}
              disabled={size.disabled}
            >
              {size.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter city and country"
          className={styles.input}
        />
        <div className={styles.emailContainer}>
          <input
            ref={emailInputRef}
            type="text"
            placeholder="invite house member"
            className={styles.emailInput}
            onChange={handleInputChange}
          />
          <button onClick={handleInvite} className={styles.inviteButton}>
            Invite
          </button>
        </div>
        {emailError && <div className={styles.error}>{emailError}</div>}{" "}
        {emails.length > 0 && (
          <div className={styles.emailTab} onClick={() => setShowModal(true)}>
            {emails[0]}
            {emails.length > 1 && ` +${emails.length - 1}`}
          </div>
        )}
        <button className={styles.createButton}>Create</button>
      </div>
      {showModal && (
        <EmailModal
          emails={emails}
          onClose={() => setShowModal(false)}
          onDeleteEmail={handleDeleteEmail}
        />
      )}
    </div>
  );
}
