import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Save,
  Loader2,
  Calendar,
  MapPin,
  User,
  Droplet,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../../../components/ErrorPage/ErrorPage";
import Swal from "sweetalert2";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    recipientName: "",
    bloodGroup: "",
    hospitalName: "",
    fullAddress: "",
    district: "",
    upazila: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [initialData, setInitialData] = useState(null);
  const [errors, setErrors] = useState({});
  const selectedDistrict = formData.district;
  const initializedRef = useRef(false);

  // Fetch Blood Groups
  const { data: bloodGroups = [] } = useQuery({
    queryKey: ["blood-groups"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blood-groups`);
      return res.data;
    },
  });

  // Fetch Districts
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/districts`);
      return res.data;
    },
  });

  // Fetch Upazilas
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas", selectedDistrict],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upzillas/${selectedDistrict}`);
      return res.data;
    },
    enabled: !!selectedDistrict,
  });

  // Fetch existing donation
  const {
    data: donation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation-edit", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Populate form + store initial data
  useEffect(() => {
    if (donation) {
      const cleanData = {
        recipientName: donation.recipientName || "",
        bloodGroup: donation.bloodGroup || "",
        hospitalName: donation.hospitalName || "",
        fullAddress: donation.fullAddress || "",
        district: donation.district || "",
        upazila: donation.upazila || "",
        donationDate: donation.donationDate || "",
        donationTime: donation.donationTime || "",
        requestMessage: donation.requestMessage || "",
      };


      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(cleanData);
      setInitialData(cleanData);
      initializedRef.current = true;
    }
  }, [donation]);

  const isFormChanged = () => {
    if (!initialData) return false;

    return Object.keys(initialData).some(
      (key) => initialData[key] !== formData[key],
    );
  };

  // Update mutation
  const { mutate: updateDonation, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/donations/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-donations"] });
      queryClient.invalidateQueries({ queryKey: ["donation-details", id] });
      toast.success("Donation request updated successfully!");
      navigate(`/dashboard/my-donation-requests/details/${id}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update request");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "district") {
      setFormData((prev) => ({ ...prev, upazila: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.recipientName.trim())
      newErrors.recipientName = "Recipient name is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.hospitalName.trim())
      newErrors.hospitalName = "Hospital name is required";
    if (!formData.fullAddress.trim())
      newErrors.fullAddress = "Full address is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.upazila) newErrors.upazila = "Upazila is required";
    if (!formData.donationDate)
      newErrors.donationDate = "Donation date is required";
    if (!formData.donationTime)
      newErrors.donationTime = "Donation time is required";
    if (!formData.requestMessage.trim())
      newErrors.requestMessage = "Request message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormChanged()) {
      toast.error("You haven't changed anything");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this donation request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      updateDonation(formData);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div>
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
            Edit Donation Request
          </h1>
          <p className="text-gray-600 mt-2">
            Update the details of your blood donation request
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 pb-14 py-14 space-y-8">
            {/* Recipient */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Recipient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Enter recipient's full name"
                  className={`w-full px-4 py-3 border ${
                    errors.recipientName ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                />
                {errors.recipientName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.recipientName}
                  </p>
                )}
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      errors.bloodGroup ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.bloodGroup}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              Location Details
            </h2>
            <div className="space-y-4">
              {/* Hospital Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className={`w-full px-4 py-3 border ${
                    errors.hospitalName ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                />
                {errors.hospitalName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.hospitalName}
                  </p>
                )}
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  className={`w-full px-4 py-3 border ${
                    errors.fullAddress ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                />
                {errors.fullAddress && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullAddress}
                  </p>
                )}
              </div>

              {/* District & Upazila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.district ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white`}
                  >
                    <option value="">Select District</option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.district}
                    </p>
                  )}
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upazila <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    disabled={!formData.district}
                    className={`w-full px-4 py-3 border ${
                      errors.upazila ? "border-red-300" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map((upazila) => (
                      <option key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                  {errors.upazila && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.upazila}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule */}

            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Donation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.donationDate ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                />
                {errors.donationDate && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.donationDate}
                  </p>
                )}
              </div>

              {/* Donation Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="donationTime"
                  value={formData.donationTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.donationTime ? "border-red-300" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all`}
                />
                {errors.donationTime && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.donationTime}
                  </p>
                )}
              </div>
            </div>

            {/* Request Message */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              Request Message
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="requestMessage"
                value={formData.requestMessage}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your blood donation request..."
                className={`w-full px-4 py-3 border ${
                  errors.requestMessage ? "border-red-300" : "border-gray-200"
                } rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none`}
              />
              {errors.requestMessage && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.requestMessage}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !isFormChanged()}
              className={`w-full sm:w-auto px-8 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all
    bg-linear-to-r from-red-600 to-pink-600 text-white
    ${
      isPending || !isFormChanged()
        ? "opacity-60 cursor-not-allowed hover:shadow-none"
        : "cursor-pointer hover:shadow-lg"
    }
  `}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
