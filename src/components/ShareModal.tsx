import { useState } from 'react';
import { X, Check, Copy, Share2, MessageCircle, Send, ExternalLink, Download } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  subtitle?: string;
}

export default function ShareModal({ isOpen, onClose, title, url, subtitle }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate full absolute URL if relative
  const absoluteUrl = url.startsWith('http')
    ? url
    : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;

  const shareText = `Check out "${title}" on VTU Notes:\n${absoluteUrl}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(absoluteUrl);
      } else {
        const input = document.createElement('input');
        input.value = absoluteUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `VTU Study Material: ${title}`,
          url: absoluteUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(absoluteUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-100 rounded-xl hover:bg-zinc-800/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-2xl">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-100">Share Document</h3>
            <p className="text-xs text-zinc-400">Share study material with your classmates</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl mb-6">
          <p className="font-semibold text-sm text-zinc-200 truncate">{title}</p>
          {subtitle && <p className="text-xs text-zinc-400 mt-0.5 truncate">{subtitle}</p>}
        </div>

        {/* Share Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2.5 px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold text-sm rounded-xl transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
            <span>WhatsApp</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2.5 px-4 py-3 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 font-semibold text-sm rounded-xl transition-all"
          >
            <Send className="w-5 h-5" />
            <span>Telegram</span>
          </a>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="col-span-2 flex items-center justify-center space-x-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]"
            >
              <Share2 className="w-4 h-4" />
              <span>More Share Options</span>
            </button>
          )}
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Direct Link</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={absoluteUrl}
              className="flex-1 px-3.5 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-zinc-300 font-mono truncate outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-xs text-zinc-400">
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 hover:underline"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={absoluteUrl}
            download
            className="inline-flex items-center space-x-1 text-zinc-400 hover:text-zinc-200 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
