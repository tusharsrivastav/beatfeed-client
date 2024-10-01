import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const dummyAvatar =
    "data:image/png;base64,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";

  const [avatar, setAvatar] = useState(dummyAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading, error } = useSignup();

  const [validationErrors, setValidationErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(dummyAvatar);

  const validateForm = () => {
    const newErrors = {};

    // Username validation (no spaces allowed, must be between 3-30 characters)
    if (!username || username.length < 3 || username.length > 30) {
      newErrors.username = "Username must be between 3 and 30 characters.";
    } else if (/\s/.test(username)) {
      newErrors.username = "Username should not contain spaces.";
    }

    // Name validation (e.g., must be between 2-30 characters)
    if (!fullname || fullname.length < 2 || fullname.length > 30) {
      newErrors.fullname = "Name must be between 2 and 30 characters.";
    }

    // Email validation (simple regex for basic email format check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation (minimum 6 characters, at least one number)
    const passwordRegex = /^(?=.*\d).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain a number.";
    }

    // Avatar validation (must be an image)
    if (avatar && avatar !== dummyAvatar) {
      const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedFileTypes.includes(avatar.type)) {
        newErrors.avatar = "Please upload an image file (jpg, png, gif).";
      }
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  const handleAvatarChange = (e) => {
    const avatarFile = e.target.files[0];
    if (avatarFile) {
      if (avatarFile.type.startsWith("image/")) {
        setAvatar(avatarFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(avatarFile);

        // Remove the 'avatar' key from validationErrors
        const newValidationErrors = { ...validationErrors };
        delete newValidationErrors.avatar; // Remove 'avatar' key
        setValidationErrors(newValidationErrors); // Update state
      } else {
        setValidationErrors({
          ...validationErrors,
          avatar: "Please upload an image file (jpg, png, gif).",
        });
      }
    } else {
      setAvatar(dummyAvatar);
      setPreviewImage(dummyAvatar);
      // Remove the 'avatar' key from validationErrors
      const newValidationErrors = { ...validationErrors };
      delete newValidationErrors.avatar; // Remove 'avatar' key
      setValidationErrors(newValidationErrors); // Update state
    }
  };

  const handleRemoveAvatar = (e) => {
    e.preventDefault();
    setAvatar(dummyAvatar);
    setPreviewImage(dummyAvatar);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create form data object
      const formData = new FormData();
      formData.append("avatar", avatar); // The avatar file
      formData.append("username", username);
      formData.append("email", email);
      formData.append("fullname", fullname);
      formData.append("password", password);

      try {
        await signup(formData);
        console.log(formData);
      } catch (error) {
        console.log("Signup failed: ", error);
      }
    }
  };

  return (
    <>
      <h2 className="poppins-semibold">Sign Up</h2>
      <form id="form-container">
        <div className="input-avatar-container">
          <img src={previewImage} alt="avatar" className="avatar-preview" />
          <label htmlFor="avatar" className="avatar-label">
            Upload Avatar
          </label>
          <input
            type="file"
            className="avatar-input"
            name="avatar"
            id="avatar"
            onChange={handleAvatarChange}
          />
          {previewImage && previewImage !== dummyAvatar && (
            <button className="remove-avatar-btn" onClick={handleRemoveAvatar}>
              Remove Avatar
            </button>
          )}
        </div>
        {validationErrors.avatar && (
          <p className="validation-error">{validationErrors.avatar}</p>
        )}

        <div className="input-field-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="input-field"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationErrors.username && (
            <p className="validation-error">{validationErrors.username}</p>
          )}
        </div>

        <div className="input-field-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="input-field"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors.email && (
            <p className="validation-error">{validationErrors.email}</p>
          )}
        </div>

        <div className="input-field-container">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            className="input-field"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
          {validationErrors.fullname && (
            <p className="validation-error">{validationErrors.fullname}</p>
          )}
        </div>

        <div className="input-field-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input-field"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="fa-solid fa-eye" id="togglePassword"></span>
          {validationErrors.password && (
            <p className="validation-error">{validationErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          id="submit-btn"
          onClick={handleSignup}
          disabled={isLoading}>
          Signup
        </button>

        {error && <div className="error poppins-regular">{error}</div>}
      </form>
    </>
  );
};

export default Signup;
