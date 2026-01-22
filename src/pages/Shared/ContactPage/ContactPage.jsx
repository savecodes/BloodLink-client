import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  HeartPulse,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const ContactPage = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const SERVICE_ID = "service_mc9j7ev";
  const TEMPLATE_ID = "template_3thjgmj";
  const PUBLIC_KEY = "96EKMg8fkDpOQZ_xY";

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        PUBLIC_KEY
      );
      toast.success("Message sent successfully!");
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: "Dhaka, Bangladesh",
      color: "red",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+880 1766 61141",
      link: "tel:+8801766661141",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "support@bloodlink.com",
      link: "mailto:support@bloodlink.com",
      color: "green",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "24/7 Support Available",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-red-50/30">
      {/* Header Section */}
      <section className="bg-linear-to-r from-red-600 to-pink-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-red-100">Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-red-50 max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? Our team is dedicated to
            supporting your life-saving journey 24/7.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  info.color === "red"
                    ? "bg-red-100 text-red-600"
                    : info.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : info.color === "green"
                    ? "bg-green-100 text-green-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                <info.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {info.title}
              </h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-base sm:text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {info.content}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send a Message
                </h2>
                <p className="text-gray-600 text-sm">
                  Estimated response time: Under 24 hours
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  We've received your inquiry and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-red-500"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                      errors.subject
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-red-500"
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows="5"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none ${
                      errors.message
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-red-500"
                    }`}
                    placeholder="Describe your request in detail..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 shadow-md shadow-red-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            {user && (
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <Link
                    to="/dashboard/create-donation-request"
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all group cursor-pointer"
                  >
                    <span className="font-medium">Request Blood</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/search-donors"
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all group cursor-pointer"
                  >
                    <span className="font-medium">Find Donors</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}

            {/* Social Connect Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-md hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Join our growing community on social platforms.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-4 bg-gray-50 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100 cursor-pointer"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-linear-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200 shadow-md hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4 text-red-700">
                <Clock className="w-6 h-6" />
                <span className="font-bold uppercase tracking-wider text-sm">
                  Availability
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Support Team</span>
                  <span className="font-bold text-gray-900">24/7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Blood Requests</span>
                  <span className="font-bold text-gray-900">Instant</span>
                </div>
                <div className="pt-3 border-t border-red-200 mt-3">
                  <p className="text-xs text-red-600 font-medium italic">
                    * Emergency services are always prioritized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <div className="relative z-10 py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {user
                  ? "Ready to save a life today?"
                  : "Join the life-saving mission"}
              </h2>
              <p className="text-red-50 text-base sm:text-lg">
                {user
                  ? "Browse urgent requests and make a difference."
                  : "Register and become a hero in someone's story."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                to={user ? "/donations-requests" : "/register"}
                className="px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:shadow-xl transition-all text-center shadow-lg cursor-pointer"
              >
                {user ? "View Requests" : "Become a Donor"}
              </Link>
              <Link
                to="/donor-guidelines"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/40 hover:bg-white/20 transition-all text-center backdrop-blur-sm cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </div>
          <HeartPulse className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
};

export default ContactPage