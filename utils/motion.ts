
export const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export const slideInVariant = {
    hidden: { x: 20 },
    visible: { x: 0 }
}

export const buttonHoverVariant = {
    hover: {
        scale: 1.3,
        color: "#3b82f6"
    },
};

export const buttonTapVariant = {
    tap: { scale: 0.95 },
};

export const buttonColorVariants = {
    initial: { backgroundColor: "#4a90e2", color: "white" },
    hover: { backgroundColor: "#3572b0", color: "white" },
    tap: { backgroundColor: "#235592", color: "white" },
};

export const rotateHoverVariant = {
    hover: { rotate: 10 },
};

export const buttonVariants = {
    hidden: {
      opacity: 0,
      x: -20, 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3, 
      },
    },
  };