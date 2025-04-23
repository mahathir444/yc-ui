export const getComponentConstantsMap = (
  name: string,
  constants: string[],
  split?: string
) => {
  return Object.fromEntries(
    constants.map((v) => {
      return [v, split ? `${name}-${split}-${v}` : `${name}-${v}`];
    })
  );
};

export const getComponentSizeMap = (
  name: string,
  size: string[] = ['mini', 'small', 'medium', 'large']
) => {
  return getComponentConstantsMap(name, size, 'size');
};

export const getComponentShapeMap = (
  name: string,
  shape: string[] = ['round', 'circle', 'square']
) => {
  return getComponentConstantsMap(name, shape, 'shape');
};

export const getComponentStatusMap = (
  name: string,
  status: string[] = ['warning', 'success', 'danger', 'normal']
) => {
  return getComponentConstantsMap(name, status, 'status');
};

export const getComponentDirectionMap = (
  name: string,
  dirs: string[] = ['vertical', 'horizontal']
) => {
  return getComponentConstantsMap(name, dirs, 'direction');
};

export const getComponentThemeMap = (
  name: string,
  dirs: string[] = ['drak', 'light']
) => {
  return getComponentConstantsMap(name, dirs, 'theme');
};
