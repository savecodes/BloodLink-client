import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Search } from "lucide-react";

const SearchDonors = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: bloodGroups = [] } = useQuery({
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
    queryKey: ["upazilas", formData.district],
    queryFn: async () => {
      const res = await axiosSecure.get(`/upzillas/${formData.district}`);
      return res.data;
    },
    enabled: !!formData.district,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" && { upazila: "" }),
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (formData.bloodGroup) params.append("bloodGroup", formData.bloodGroup);
      if (formData.district) params.append("district", formData.district);
      if (formData.upazila) params.append("upazila", formData.upazila);

      // You'll need to create this endpoint in your backend
      const res = await axiosSecure.get(`/donors/search?${params.toString()}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setFormData({
      bloodGroup: "",
      district: "",
      upazila: "",
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Blood Donors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for verified blood donors in your area. Filter by blood group and
            location to find the right match.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Blood Group */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white text-gray-700"
              >
                <option value="">Any</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white text-gray-700"
              >
                <option value="">Any</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upazila
              </label>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                disabled={!formData.district}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-white text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Any</option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1 flex items-end">
              {!hasSearched ? (
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search size={20} />
                  {isSearching ? "Searching..." : "Search"}
                </button>
              ) : (
                <div className="w-full flex gap-2">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search size={20} />
                    {isSearching ? "Searching..." : "Search"}
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={isSearching}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {searchResults.length === 0 && !isSearching && !hasSearched && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Search for Donors
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Use the filters above to find blood donors in your area. You can filter by
              blood group, district, and upazila.
            </p>
          </div>
        )}

        {/* No Results Found */}
        {searchResults.length === 0 && !isSearching && hasSearched && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Donors Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any donors matching your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <img
                      src={donor.photoURL || "https://via.placeholder.com/64"}
                      alt={donor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-100"
                    />
                  </div>
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {donor.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-red-100 text-red-700 font-bold text-sm rounded-full">
                        {donor.bloodGroup}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {donor.upazila}, {donor.district}
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                  Contact Donor
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Searching for donors...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;