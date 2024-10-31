import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const dummyAvatar =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXm5uazs7OwsLDp6enl5eXh4eG5ubm2trbe3t7S0tK3t7fW1tbb29vMzMy9vb3Pz8/GxsaNHQeAAAAFhklEQVR4nO2d25qrIAyFBTy1Hur7P+1o60wPW61AIivu/Fe97PoSkhAiZJmiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqioOFcls9Mv0+Gy4umG/qyMiNV2Q+3tjiRSlc0Q2msNU+stVV/KU6h0WXNUL2pe8o0Qyteo8u766K6X1P2Req/GMWoz2zou2usaslmvC1754fGLheq0bXlDn13Vx0aiSLzbp++h0gjTqSrew+Bd5FlI0mia/zkPTR2qf/2ftzN04CzxD5P/c934oYggZOnCsmOvkvwBRHZMY8QOCKgjgt1UTESYwWiSwyMou/UqVVs0RIINFfkiFoRCETOi8GJ8FPigLoUSXz0LvECKrEnEmhAo41rqEw40qdWs0hJJ9DYG56fkppwlAgYTwlXoYGMp2SB9FciWt6nyoVPhWhGzEnKmTfAjEgbZyZsB2VEcicdKVOLeocyGc7YNrWoVwp6E4K56YVBIVTpxrEMDVQ0dbQFzQzSQnQsJkQqvzkCDVZZQ12UzgCFGvqKBkwhSZt0gRJmk+h8DnxlKuRJh6rwQNzAIhAp0jDZ8PwKcTI+UywF2j4x5UPbpBb2hGV7aCzQ6QVPXYqTLLj2FjiBZoRDIdQpomNotWEdIrJ0MXogE7IkRKBsOFEzKATq0kwwuClQp22CoY8BppDeiBZtwI3eTfsBqC7NWBaiRSq9s5peIFbCYDjkBlPI0xL+DxQC1d5MbX2gDSKLQqi6rWAQCLXHZ+lFIcWZkfxKrxCrMOXYIQINKkyQr0QwJ83oC1Owoa/RTam7wkh9qAfEsQaqWfqANtaABdIHpBsom1rNEqQ7qCuek9KekyKNQ71AeAJVIZWkT+h6+xVinJkgqmvsFfaTbpovg6AvraHIiXZIrWKbuK/xR3A/kZ3Ju0gLAnvoTFwFjrdlWiCqtKlS//s9xEQbpAbpBhFGhOqurRPed4NqkG4SbET8QPoguLSBmi/ZJHCASEicuRO4j8JrPq0SNvh9lRFJHwRNEMlZhllgR0OUwpDGG2hvZhX/joa9pP7PfvjnRMgm8AYBTX5hCgNijaB0eMc/60tTmPsKFKfQvzgVp9C3cpMWS/27GdLyof9WX0Sf7RX/ZoasujSk5yZq95SF7BGlhRr/bCFtIQYcJuJ82byLgIabLDcN2eXL2gOH9faltISz0EM2SbEmD/yqVIwRQ89J5azE4BM2K+Qhj4gBMNBpqA9i5mqsiPo76qtgCcekkcNf+EuxiB6HRvs+9h1XE8x7I0t0DcmkMO5psLtR6MMd33NF9ODen8QSccbUXb49BugFnKf6v7X2BdtDPePpao4bzYB6xCz6JjNCrEaXN8T++apxSP0wonN1t/OxykCJ1S1Lp9G54taTxs9FjWWi6zFG6x0g71fj0WZ049pbe8iYTeNhIl02vUJtD5T30Hi9HLQe68l2B6ubNZrugBKg7dOomzXaoeVNHox5b7fIsqu5vNW16fVNWMPz7rwrmG5DDmEUSf4G9LizhTDgH7YaKA1JuLOlw9qerA4gvy6BiqmeoxCZM91lTYEtL9GnAK5m3TpEE12XBz2Tfixx3Q7YJfiKNeEhh+vhCmqC26tSBE6eenKBU8AJiKmSBAZJ5Hoehwvvx66J34Y9AN+1yHLlKi9+oyo8V64y4zNS5QA3EzvYPwIgLco82Ts11qb+o8HsjDahY3cA7FuKslL9J3vmjAUmihf23CjJ8qjoYezwU3HFzAffrymivy/3WL5NN8pNhX98ewkr9f8jYNOIJzDhl5XI83LTwWyGU6aXfQ+mXFcou5x5shFrzuCkm7cVyd1UvLMaTc/ipKZai6Y879wnYNVNC4ndmUXWdsLnyBV3lqPpaZbhatI/zTI0a24quD/zL89o+gM/A1vbv6DpZwAAAABJRU5ErkJggg==";

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
      <p className="font-sans font-regular text-2xl text-white m-3">Sign Up</p>
      <form className="text-beige-light md:border md:border-charcoal md:rounded-xl flex flex-col w-4/5 md:w-[600px] box-border items-center px-0 py-3 md:px-20 md:py-7 md:mb-32">
        <div className="flex w-full my-6 items-center">
          <img
            src={previewImage}
            alt="avatar"
            className="size-24 rounded-full mr-6"
          />
          <input
            type="file"
            className="opacity-0 absolute w-[0.1px] h-[0.1px]"
            name="avatar"
            id="avatar"
            onChange={handleAvatarChange}
          />
          <div className="flex flex-col lg:flex-row">
            <label htmlFor="avatar" className="bg-charcoal rounded px-3 py-2 m-0 my-2 lg:my-0 lg:mx-4 cursor-pointer text-[0.8rem] text-white text-center w-32 lg:w-auto hover:opacity-85">
              Upload Avatar
            </label>
            {previewImage && previewImage !== dummyAvatar && (
              <button
                className="bg-charcoal rounded px-3 py-2 m-0 cursor-pointer text-[0.8rem] text-white justify-center w-32 lg:w-auto hover:opacity-85"
                onClick={handleRemoveAvatar}>
                Remove Avatar
              </button>
            )}
          </div>
        </div>
        {validationErrors.avatar && (
          <p className="w-full font-sans text-red my-2 mb-4 leading-5">{validationErrors.avatar}</p>
        )}

        <div className="w-full mb-2 mt-5 lg:my-5">
          <label htmlFor="username" className="text-md lg:text-base">Username</label>
          <input
            type="text"
            className="border border-charcoal rounded-md w-full bg-black h-12 p-3 box-border focus:outline-none"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationErrors.username && (
            <p className="text-md text-red my-2 mb-1 leading-5">{validationErrors.username}</p>
          )}
        </div>

        <div className="w-full mb-2 mt-5 lg:my-5">
          <label htmlFor="email" className="text-md lg:text-base">Email</label>
          <input
            type="text"
            className="border border-charcoal rounded-md w-full bg-black h-12 p-3 box-border focus:outline-none"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors.email && (
            <p className="text-md text-red my-2 mb-1 leading-5">{validationErrors.email}</p>
          )}
        </div>

        <div className="w-full mb-2 mt-5 lg:my-5">
          <label htmlFor="fullname" className="text-md lg:text-base">Fullname</label>
          <input
            type="text"
            className="border border-charcoal rounded-md w-full bg-black h-12 p-3 box-border focus:outline-none"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
          {validationErrors.fullname && (
            <p className="text-md text-red my-2 mb-1 leading-5">{validationErrors.fullname}</p>
          )}
        </div>

        <div className="w-full my-5 lg:my-5">
          <label htmlFor="password" className="text-md lg:text-base">Password</label>
          <input
            type="password"
            className="border border-charcoal rounded-md w-full bg-black h-12 p-3 box-border focus:outline-none"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && (
            <p className="text-md text-red my-2 mb-4 leading-5">{validationErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-[120px] box-border bg-transparent border border-blue rounded-md text-blue px-5 py-3 text-base cursor-pointer my-12 lg:my-6 opacity-100 hover:opacity-80 disabled:border-charcoal disabled:text-charcoal disabled:hover:opacity-100"
          onClick={handleSignup}
          disabled={isLoading}>
          Signup
        </button>

        {error && <div className="font-sans w-full text-md font-light text-beige bg-red-light border border-red rounded-md my-4 mx-6 py-3 px-6 box-border">{error}</div>}
      </form>
    </>
  );
};

export default Signup;
