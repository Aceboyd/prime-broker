import React, { useState } from "react";
import {
  ShieldCheck,
  User,
  MapPin,
  FileText,
  CheckCircle2,
  UploadCloud,
  CreditCard,
  IdCard,
  Calendar,
} from "lucide-react";

const KYCVerification = () => {
  const [selectedDoc, setSelectedDoc] = useState("passport");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6 px-4 lg:px-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400">Dashboard &gt; Verification &gt; KYC Form</div>

      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">KYC Verification Form</h2>
          <p className="text-gray-400 text-sm">Begin your identity verification</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden">
        {/* Intro */}
        <div className="p-6 text-center border-b border-white/5">
          <h3 className="text-xl font-semibold text-white">Begin Your ID-Verification</h3>
          <p className="text-gray-400 text-sm mt-2">
            To comply with regulations, each participant will have to go through identity verification (KYC/AML) to prevent fraud.
          </p>
        </div>

        <div className="p-6 space-y-10">
          {/* Personal Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-semibold text-white">Personal Details</h4>
            </div>
            <p className="text-gray-400 text-sm">Your simple personal information required for identification</p>

            <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-4 text-yellow-300 text-sm">
              Please type carefully and fill out the form with your personal details. You cannot edit these details once you have submitted the form.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">First Name *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Last Name *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Email *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Phone Number *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Date of Birth *</label>
                <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <input className="w-full bg-transparent text-white outline-none" placeholder="dd/mm/yyyy" />
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Twitter or Facebook Username *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-semibold text-white">Your Address</h4>
            </div>
            <p className="text-gray-400 text-sm">Your simple location information required for identification</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">Address Line *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">City *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">State *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Nationality *</label>
                <input className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white" />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h4 className="text-lg font-semibold text-white">Document Upload</h4>
            </div>
            <p className="text-gray-400 text-sm">Your simple personal document required for identification</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "passport", label: "Int'l Passport", Icon: IdCard },
                { id: "nid", label: "National ID", Icon: CreditCard },
                { id: "drivers", label: "Driver's License", Icon: FileText },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedDoc(id)}
                  className={`rounded-2xl border p-4 text-center transition ${
                    selectedDoc === id
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <p className="mt-3 font-medium text-white">{label}</p>
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
                <p className="font-medium text-white mb-2">
                  To avoid delays when verifying your account, please make sure your document meets the criteria below:
                </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Chosen credential must not have expired.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Document should be in good condition and clearly visible.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Make sure that there is no light glare on the card.
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-white mb-3">Upload Front Side</p>
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-6 items-center">
                  <label className="rounded-2xl bg-white/5 p-6 flex flex-col items-center justify-center text-center cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-gray-300" />
                    <p className="mt-3 text-sm text-white">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    <input type="file" className="hidden" />
                  </label>
                  <div className="rounded-2xl bg-white/5 p-6 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">Upload Back Side</p>
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-6 items-center">
                  <label className="rounded-2xl bg-white/5 p-6 flex flex-col items-center justify-center text-center cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-gray-300" />
                    <p className="mt-3 text-sm text-white">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    <input type="file" className="hidden" />
                  </label>
                  <div className="rounded-2xl bg-white/5 p-6 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-gray-300">All The Information I Have Entered Is Correct.</span>
          </div>

          <button
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition text-white font-medium"
            disabled={!agreed}
          >
            <CheckCircle2 className="w-5 h-5" />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
