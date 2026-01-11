import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Droplet,
  MapPin,
  ArrowLeft,
  Upload,
  Loader2,
  Camera,
  AlertCircle,
} from "lucide-react";
import { updateProfile } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";
import {
  getBloodGroups,
  getDistricts,
  getUpazilasByDistrict,
} from "../../../services/locationService";
import useAxios from "../../../hooks/useAxios";

// Validation rules centralized
const validationRules = {
  name: {
    required: "Name is required",
    minLength: { value: 3, message: "Name must be at least 3 characters" },
    validate: (v) => v.trim().length >= 3 || "Name cannot be empty spaces",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: "Enter a valid email",
    },
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" },
    validate: {
      hasUpper: (v) => /[A-Z]/.test(v) || "Must contain uppercase letter",
      hasLower: (v) => /[a-z]/.test(v) || "Must contain lowercase letter",
      hasNumber: (v) => /\d/.test(v) || "Must contain a number",
    },
  },
  bloodGroup: { required: "Blood group is required" },
  district: { required: "District is required" },
  upazila: { required: "Upazila is required" },
};

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // const [uploadingImage, setUploadingImage] = useState(false);

  const axiosInstance = useAxios();

  // Location data
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [bloodGroups, setBloodGroups] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const password = watch("password", "");

  // Password strength indicators
  const passwordChecks = {
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasLength: password.length >= 6,
  };

  // Load blood groups & districts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [bg, dist] = await Promise.all([
          getBloodGroups(axiosInstance),
          getDistricts(axiosInstance),
        ]);
        setBloodGroups(bg);
        setDistricts(dist);
      } catch (err) {
        console.error("Failed to load initial data", err);
      }
    };
    loadInitialData();
  }, [axiosInstance]);

  // if District change load upazila
  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      return;
    }

    const loadUpazilas = async () => {
      try {
        const data = await getUpazilasByDistrict(
          axiosInstance,
          selectedDistrict
        );
        setUpazilas(data);
      } catch (err) {
        console.error("Failed to load upazilas", err);
      }
    };

    loadUpazilas();
  }, [selectedDistrict, axiosInstance]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleRegistration = async (data) => {
    try {
      setIsLoading(true);

      const userCredential = await registerUser(data.email, data.password);

      // 2️⃣ Upload image
      let photoURL = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageRes = await axiosInstance.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        photoURL = imageRes.data.data.url;
      }

      // 3️⃣ Update firebase profile
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL,
      });

      // 4️⃣ Save full user info to backend
      const userInfo = {
        uid: userCredential.user.uid,
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        photoURL,
        role: "donor",
        status: "active",
        createdAt: new Date(),
      };

      await axiosInstance.post("/users", userInfo);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
          {/* Mobile Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group mb-6"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Register to become a blood donor</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-5"
          >
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-gray-100 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-linear-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all shadow-md group"
                >
                  <Upload className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">
                Upload profile picture (max 5MB)
              </p>
            </div>

            {/* Name & Blood Group */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("name", validationRules.name)}
                    placeholder="John Doe"
                    className={`w-full h-12 pl-11 pr-4 rounded-xl border-2 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:outline-none focus:ring-4 transition-all`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <select
                    {...register("bloodGroup", validationRules.bloodGroup)}
                    className={`w-full h-12 pl-11 pr-4 rounded-xl border-2 ${
                      errors.bloodGroup
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:outline-none focus:ring-4 transition-all appearance-none bg-white cursor-pointer`}
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.bloodGroup && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email", validationRules.email)}
                  placeholder="john@example.com"
                  className={`w-full h-12 pl-11 pr-4 rounded-xl border-2 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                  } focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* District & Upazila */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <select
                    {...register("district", validationRules.district)}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setValue("upazila", "");
                    }}
                    className={`w-full h-12 pl-11 pr-4 rounded-xl border-2 ${
                      errors.district
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:outline-none focus:ring-4 transition-all appearance-none bg-white cursor-pointer`}
                  >
                    <option value="">Select district</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.district && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upazila <span className="text-red-600">*</span>
                </label>
                <select
                  {...register("upazila", validationRules.upazila)}
                  disabled={!selectedDistrict}
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    errors.upazila
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                  } focus:outline-none focus:ring-4 transition-all appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500`}
                >
                  <option value="">Select upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
                {errors.upazila && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.upazila.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", validationRules.password)}
                  placeholder="••••••••"
                  className={`w-full h-12 pl-11 pr-11 rounded-xl border-2 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                  } focus:outline-none focus:ring-4 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password.message}
                </p>
              )}

              {/* Password Strength Indicators */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordChecks.hasLength
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={
                        passwordChecks.hasLength
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordChecks.hasUpper ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={
                        passwordChecks.hasUpper
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordChecks.hasLower ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={
                        passwordChecks.hasLower
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordChecks.hasNumber
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={
                        passwordChecks.hasNumber
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      One number
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full h-12 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
