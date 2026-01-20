import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Droplet,
  MapPin,
  Camera,
  Loader2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import {
  getBloodGroups,
  getDistricts,
  getUpazilasByDistrict,
} from "../../../../services/locationService";
import { ACCOUNT_STATUS } from "../../../../services/statusConfig";
import useRole from "../../../../hooks/useRole";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDistrict = watch("district");

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.uid}`);
      return res.data;
    },
  });

  const { data: bloodGroups = [] } = useQuery({
    queryKey: ["bloodGroups"],
    queryFn: () => getBloodGroups(axiosInstance),
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () => getDistricts(axiosInstance),
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas", selectedDistrict],
    enabled: !!selectedDistrict,
    queryFn: () => {
      // ✅ District name থেকে ID খুঁজে বের করুন
      const districtObj = districts.find((d) => d.name === selectedDistrict);
      if (!districtObj) return [];
      return getUpazilasByDistrict(axiosInstance, districtObj.id);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      let photoURL = userData.photoURL;

      if (formData.imageFile) {
        const imgData = new FormData();
        imgData.append("image", formData.imageFile);

        const imgRes = await axiosInstance.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          imgData,
        );

        photoURL = imgRes.data.data.url;
      }

      await updateUserProfile({
        displayName: formData.name,
        photoURL,
      });

      await axiosInstance.put(`/users/${user.uid}`, {
        ...formData,
        photoURL,
      });
    },

    onSuccess: () => {
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setImageFile(null);
      refetch();
    },

    onError: () => {
      setError("Failed to update profile");
    },
  });

  /* ---------------- SYNC FORM ---------------- */
  useEffect(() => {
    if (!userData) return;

    reset({
      name: userData.name,
      bloodGroup: userData.bloodGroup,
      district: userData.district,
      upazila: userData.upazila,
    });

    setImagePreview(userData.photoURL);
  }, [userData, reset]);

  /* ---------------- HANDLERS ---------------- */
  const onSubmit = (data) => {
    setError("");
    setSuccess("");
    updateProfileMutation.mutate({ ...data, imageFile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    setError("");
    setSuccess("");
    setImagePreview(userData.photoURL);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return setError("Only image files allowed");

    if (file.size > 5 * 1024 * 1024) return setError("Max image size is 5MB");

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  if (isLoading || isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-11/12 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-32 bg-linear-to-r from-red-400 via-pink-400 to-purple-400"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={userData?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-red-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold">
                    {userData?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              {isEditing && (
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-2 right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors shadow-lg"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left sm:ml-4 sm:mt-16">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData?.name}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {role}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{userData?.email}</p>
            </div>

            {/* Blood Group */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 text-red-600 font-bold text-xl sm:mt-16">
              {userData?.bloodGroup}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" /> Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  disabled={!isEditing}
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    isEditing
                      ? "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                      : "border-gray-100 bg-gray-50"
                  } focus:outline-none transition-all disabled:cursor-not-allowed`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </label>
                <input
                  type="email"
                  value={userData?.email}
                  disabled
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Blood Group, District, Upazila */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Droplet className="w-4 h-4 inline mr-1" /> Blood Group
                </label>
                <select
                  {...register("bloodGroup", {
                    required: "Blood group is required",
                  })}
                  disabled={!isEditing}
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    isEditing
                      ? "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                      : "border-gray-100 bg-gray-50"
                  } focus:outline-none transition-all appearance-none disabled:cursor-not-allowed`}
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" /> District
                </label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  onChange={(e) => {
                    setValue("district", e.target.value);
                    setValue("upazila", "");
                  }}
                  disabled={!isEditing}
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    isEditing
                      ? "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                      : "border-gray-100 bg-gray-50"
                  } focus:outline-none transition-all appearance-none disabled:cursor-not-allowed`}
                >
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" /> Upazila
                </label>
                <select
                  {...register("upazila", { required: "Upazila is required" })}
                  disabled={!isEditing}
                  className={`w-full h-12 px-4 rounded-xl border-2 ${
                    isEditing
                      ? "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                      : "border-gray-100 bg-gray-50"
                  } focus:outline-none transition-all appearance-none disabled:cursor-not-allowed`}
                >
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Account Status */}
            {userData && (
              <div
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  ACCOUNT_STATUS[userData.status]?.container
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {ACCOUNT_STATUS[userData.status]?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {ACCOUNT_STATUS[userData.status]?.message}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    ACCOUNT_STATUS[userData.status]?.badge
                  }`}
                >
                  {ACCOUNT_STATUS[userData.status]?.badgeText}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updateProfileMutation.isLoading}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <X className="w-5 h-5" /> Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {updateProfileMutation.isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all cursor-pointer"
                >
                  <User className="w-5 h-5" /> Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
