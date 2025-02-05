export const POSTION_MAP = {
  left: {
    top: 0,
    left: 0,
    right: 'unset',
    bottom: 'unset',
  },
  right: {
    top: 0,
    left: 'unset',
    right: 0,
    bottom: 'unset',
  },
  top: {
    top: 0,
    left: 0,
    right: 'unset',
    bottom: 'unset',
  },
  bottom: {
    top: 'unset',
    left: 0,
    right: 'unset',
    bottom: 0,
  },
};

export const BORDER_MAP = {
  left: {
    borderLeft: 0,
    borderTop: 0,
    borderBottom: 0,
  },
  right: {
    borderRight: 0,
    borderTop: 0,
    borderBottom: 0,
  },
  top: {
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
  },
  bottom: {
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
  },
};

export const TRANSFORM_MAP = {
  left: 'translateX(-100%)',
  right: 'translateX(100%)',
  top: 'translateY(-100%)',
  bottom: 'translateY(100%)',
};
