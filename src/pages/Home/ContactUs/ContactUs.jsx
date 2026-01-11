import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_mc9j7ev",
        "template_3thjgmj",
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "96EKMg8fkDpOQZ_xY"
      );

      toast.success("Message sent successfully! We will get back to you soon.");
      reset(); // only after success
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-11/12 mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Contact Info */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-red-600 font-semibold uppercase tracking-wider text-sm mb-3">
                GET IN TOUCH
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Have Questions? We're Here to Help
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Whether you're a donor, volunteer, or someone in need, our team
                is ready to assist you. Reach out to us anytime.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Email</p>
                  <a
                    href="mailto:contact@bloodlink.com"
                    className="text-gray-900 font-semibold text-lg hover:text-red-600 transition-colors"
                  >
                    support@bloodlink.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Phone</p>
                  <a
                    href="tel:+15551234567"
                    className="text-gray-900 font-semibold text-lg hover:text-red-600 transition-colors"
                  >
                    +880 1766 61141
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Address</p>
                  <p className="text-gray-900 font-semibold text-lg">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Name must not exceed 50 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name can only contain letters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:ring-2 outline-none transition-all`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name.message}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                    } focus:ring-2 outline-none transition-all`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 5,
                      message: "Subject must be at least 5 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Subject must not exceed 100 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                  } focus:ring-2 outline-none transition-all`}
                />
                {errors.subject && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.subject.message}</span>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us more..."
                  rows="5"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Message must not exceed 500 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-red-500 focus:ring-red-200"
                  } focus:ring-2 outline-none transition-all resize-none`}
                ></textarea>
                {errors.message && (
                  <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-red-600 text-white font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
