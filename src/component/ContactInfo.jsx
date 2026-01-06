import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MapPin, Clock, CheckCircle, Globe, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../types/contactTypes';

/**
 * Contact information component displaying location, availability, and professional details
 * @returns {JSX.Element} ContactInfo component
 */
function ContactInfo() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const infoItems = [
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT_INFO.location,
      color: 'text-green-400'
    },
    {
      icon: Clock,
      label: 'Timezone',
      value: CONTACT_INFO.timezone,
      color: 'text-blue-400'
    },
    {
      icon: CheckCircle,
      label: 'Availability',
      value: CONTACT_INFO.availability,
      color: 'text-cyan-400'
    },
    {
      icon: MessageCircle,
      label: 'Response Time',
      value: CONTACT_INFO.responseTime,
      color: 'text-purple-400'
    },
    {
      icon: Globe,
      label: 'Languages',
      value: CONTACT_INFO.languages.join(', '),
      color: 'text-indigo-400'
    }
  ];

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
          Let's connect
        </h2>
        <p className="text-gray-300">
          Here's everything you need to know about getting in touch with me.
        </p>
      </div>

      {/* Info Items */}
      <div className="space-y-4">
        {infoItems.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-800/20 to-gray-900/20 
                         hover:from-gray-800/30 hover:to-gray-900/30 transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700/30 to-gray-800/30 
                              flex items-center justify-center">
                <IconComponent 
                  className={`w-5 h-5 ${item.color}`}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-300 text-sm uppercase tracking-wide mb-1">
                  {item.label}
                </h3>
                <p className="text-white font-medium">
                  {item.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className="mt-8 p-6 rounded-xl bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 
                   border border-cyan-800/30"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Ready to start a conversation?
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Whether you have a project in mind, want to collaborate, or just want to say hello, 
            I'd love to hear from you.
          </p>
          
          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">
              Currently available for new opportunities
            </span>
          </div>
        </div>
      </motion.div>

      {/* Professional Note */}
      <motion.div
        variants={itemVariants}
        className="mt-6 pt-6 border-t border-gray-700/50"
      >
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          I value meaningful connections and professional relationships. 
          All inquiries are treated with confidentiality and respect.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ContactInfo;