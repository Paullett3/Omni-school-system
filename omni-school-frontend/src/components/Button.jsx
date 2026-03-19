import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className }) => {
  const themes = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-blue-400 text-blue-600 hover:bg-blue-50'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${themes[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};