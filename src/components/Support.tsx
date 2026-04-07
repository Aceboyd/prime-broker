import React from 'react';
import { BadgeCheck, Clock, HelpCircle, Mail, MessageCircle, Send, Shield, User } from 'lucide-react';

const faqs = [
  {
    q: 'How long does it take to process a withdrawal?',
    a: 'Most withdrawals are processed within 24-48 hours. However, processing times may vary depending on the payment method and amount.',
  },
  {
    q: 'What are the fees for crypto swapping?',
    a: 'Our platform charges a fee of 2% for all crypto swapping operations. This fee is automatically calculated and displayed during the swap process.',
  },
  {
    q: 'How can I secure my account?',
    a: 'We recommend enabling two-factor authentication (2FA), using a strong unique password, and regularly monitoring your account for any suspicious activity.',
  },
];

const Support = () => {
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-emerald-300" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white">24/7 Customer Support</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_2fr] gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="text-white font-semibold">Contact Information</p>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-sm text-white font-semibold mb-3">Direct Email</p>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-300" />
                </div>
                <p className="text-emerald-300 font-semibold">support@opromax.sbs</p>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <p className="text-white font-semibold">Support Hours</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">Our team is available 24/7 to assist you with any inquiries or issues you may have.</p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-300" />
                <p className="text-white font-semibold">Response Time</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="text-white font-semibold">Send us a Message</p>
          </div>
          <div className="p-5 space-y-5">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-white font-semibold">Adegbenro victor</p>
                <p className="text-sm text-gray-400">real12@gmail.com</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-white font-semibold">
                Your Message <span className="text-rose-400">*</span>
              </label>
              <textarea
                className="mt-3 w-full min-h-[180px] rounded-xl border border-white/10 bg-white/5 p-4 text-gray-200 outline-none"
                placeholder="How can we help you today?"
              />
            </div>

            <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-emerald-300" />
          </div>
          <p className="text-white font-semibold">Frequently Asked Questions</p>
        </div>
        <div className="p-5 space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-semibold">{item.q}</p>
              <p className="text-sm text-gray-400 mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
