import { useState } from "react";
import {
  User,
  Mail,
  UserCircle,
  Droplet,
  Building2,
  MapPin,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const CreateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const selectedDistrict = formData.district;

  const [errors, setErrors] = useState({});

  const { data: bloodGroups = [], isLoading } = useQuery({
    queryKey: ["blood-groups"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blood-groups`);
      return res.data;
    },
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/districts`);
      return res.data;
    },
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas", selectedDistrict],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upzillas/${selectedDistrict}`);
      return res.data;
    },
    enabled: !!selectedDistrict,
  });

  const donationMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/donations", payload);
      return res.data;
    },
    onSuccess: () => {
      // console.log("Donation created:", data);
      setFormData({
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
      toast.success("Donation request submitted");
      navigate("/dashboard/my-donation-requests");
    },
    onError: () => {
      // console.error(error);
      toast.error("Failed to submit donation request");
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

  const validate = () => {
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
    if (!formData.requestMessage.trim()) {
      newErrors.requestMessage = "Request message is required";
    } else if (formData.requestMessage.trim().length < 20) {
      newErrors.requestMessage = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
      requesterEmail: user.email,
      requesterName: user.displayName,
    };

    donationMutation.mutate(payload);
  };

  const handleCancel = () => {
    setFormData({
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
    setErrors({});
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Create Donation Request
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the details to request blood donation
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <User className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Requester Information
              </h2>
              <p className="text-sm text-gray-600">
                Your contact information (auto-filled from your profile)
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" /> Your Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                // defaultValue={user.displayName}
                disabled
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" /> Your Email
              </label>
              <input
                type="email"
                // defaultValue={user.email}
                value={user?.email}
                disabled
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-gray-50 cursor-not-allowed text-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recipient Information
              </h2>
              <p className="text-sm text-gray-600">
                Details about the person who needs blood
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recipient Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="Enter recipient's full name"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all"
              />
              {errors.recipientName && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.recipientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Droplet className="w-4 h-4 inline mr-1" /> Blood Group Required{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all appearance-none bg-white"
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.bloodGroup}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Hospital & Location
              </h2>
              <p className="text-sm text-gray-600">
                Where the blood donation is needed
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" /> Hospital Name{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all"
              />
              {errors.hospitalName && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.hospitalName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                placeholder="Enter complete address"
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all"
              />
              {errors.fullAddress && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullAddress}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" /> District{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Select district</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.district}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" /> Upazila{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
                {errors.upazila && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.upazila}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Date & Time</h2>
              <p className="text-sm text-gray-600">
                When the blood donation is needed
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" /> Donation Date{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all"
              />
              {errors.donationDate && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.donationDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" /> Donation Time{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all"
              />
              {errors.donationTime && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.donationTime}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Request Details
              </h2>
              <p className="text-sm text-gray-600">
                Additional information about the request
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Request Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows="5"
              placeholder="Describe why you need blood donation, any urgency, medical condition, etc."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 focus:outline-none transition-all resize-none"
            ></textarea>
            {errors.requestMessage && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.requestMessage}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={donationMutation.isPending}
            className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all cursor-pointer"
          >
            {donationMutation.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
