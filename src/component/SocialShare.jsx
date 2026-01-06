import { useState } from 'react';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Share2, Twitter, Linkedin, Facebook, Link, Check } from 'lucide-react';

function SocialShare({ article, className = "" }) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const articleUrl = `${window.location.origin}/blog/${article.id}`;
  const articleTitle = article.title;
  const articleExcerpt = article.excerpt || '';

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}&via=MENYOTHYCODE`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
  };

  const handleShare = (platform) => {
    const url = shareUrls[platform];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = articleUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          text: articleExcerpt,
          url: articleUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">Share this article</h3>
      </div>

      <div className="flex items-center gap-3">
        {/* Twitter */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </motion.button>

        {/* LinkedIn */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </motion.button>

        {/* Facebook */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </motion.button>

        {/* Copy Link */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
          aria-label="Copy link"
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          {copied ? <Check className="w-5 h-5" /> : <Link className="w-5 h-5" />}
        </motion.button>

        {/* Native Share (if supported) */}
        {navigator.share && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNativeShare}
            className="flex items-center justify-center w-10 h-10 bg-cyan-700 hover:bg-cyan-600 text-white rounded-full transition-colors"
            aria-label="Share"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Copy confirmation */}
      {copied && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-green-400 text-sm mt-2"
        >
          Link copied to clipboard!
        </motion.p>
      )}
    </div>
  );
}

export default SocialShare;