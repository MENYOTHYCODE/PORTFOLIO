import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Mail, Linkedin, Github, Twitter, MessageCircle, ExternalLink } from 'lucide-react';
import { CONTACT_METHODS } from '../types/contactTypes';

// Icon mapping
const iconMap = {
  Mail,
  Linkedin,
  Github,
  Twitter,
  MessageCircle
};

/**
 * Contact methods component displaying alternative contact options
 * @returns {JSX.Element} ContactMethods component
 */
function ContactMethods() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#1E293B]/60 backdrop-blur-xl rounded-2xl border border-cyan-900/40 p-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Other ways to reach me
        </h2>
        <p className="text-gray-300">
          Prefer a different method? Feel free to connect with me through any of these platforms.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONTACT_METHODS.map((method) => {
          const IconComponent = iconMap[method.icon];
          const isWhatsApp = method.name === 'whatsapp';
          
          return (
            <motion.a
              key={method.name}
              href={method.link}
              target={method.external ? '_blank' : '_self'}
              rel={method.external ? 'noopener noreferrer' : undefined}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                isWhatsApp 
                  ? 'border-green-700/50 hover:border-green-500/50 bg-gradient-to-br from-green-800/30 to-green-900/30 hover:from-green-900/20 hover:to-green-800/20'
                  : 'border-gray-700/50 hover:border-cyan-500/50 bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:from-cyan-900/20 hover:to-indigo-900/20'
              }`}
              aria-label={`Contact via ${method.label}`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br transition-all duration-200 ${
                isWhatsApp
                  ? 'from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/5'
                  : 'from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/5 group-hover:to-indigo-500/5'
              }`} />
              
              {/* Content */}
              <div className="relative flex items-center gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center transition-all duration-200 ${
                  isWhatsApp
                    ? 'from-green-600/20 to-green-700/20 group-hover:from-green-600/30 group-hover:to-green-700/30'
                    : 'from-cyan-600/20 to-indigo-600/20 group-hover:from-cyan-600/30 group-hover:to-indigo-600/30'
                }`}>
                  {IconComponent && (
                    <IconComponent 
                      className={`w-6 h-6 transition-colors duration-200 ${
                        isWhatsApp
                          ? 'text-green-400 group-hover:text-green-300'
                          : 'text-cyan-400 group-hover:text-cyan-300'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Method Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold transition-colors duration-200 ${
                    isWhatsApp
                      ? 'text-white group-hover:text-green-100'
                      : 'text-white group-hover:text-cyan-100'
                  }`}>
                    {method.label}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 truncate">
                    {method.value}
                  </p>
                </div>

                {/* External Link Indicator */}
                {method.external && (
                  <div className="flex-shrink-0">
                    <ExternalLink 
                      className={`w-4 h-4 transition-colors duration-200 ${
                        isWhatsApp
                          ? 'text-gray-500 group-hover:text-green-400'
                          : 'text-gray-500 group-hover:text-cyan-400'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-xl border border-transparent transition-all duration-200 pointer-events-none ${
                isWhatsApp
                  ? 'group-hover:border-green-500/20'
                  : 'group-hover:border-cyan-500/20'
              }`} />
            </motion.a>
          );
        })}
      </div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-6 border-t border-gray-700/50"
      >
        <p className="text-sm text-gray-400 text-center">
          I'm most responsive on email, WhatsApp, and LinkedIn. 
          <span className="text-cyan-400 font-medium"> Usually reply within 24 hours.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ContactMethods;