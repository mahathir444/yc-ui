export const getComponentSizeMap = (
  name: string,
  size: string[] = ['mini', 'small', 'medium', 'large']
) => {
  return Object.fromEntries(
    size.map((v) => {
      return [v, `${name}-size-${v}`];
    })
  );
};

export const getComponentShapeMap = (
  name: string,
  shape: string[] = ['round', 'circle', 'square']
) => {
  return Object.fromEntries(
    shape.map((v) => {
      return [v, `${name}-shape-${v}`];
    })
  );
};

export const getComponentStatusMap = (
  name: string,
  status: string[] = ['warning', 'success', 'danger', 'normal']
) => {
  return Object.fromEntries(
    status.map((v) => {
      return [v, `${name}-status-${v}`];
    })
  );
};

export const getComponentTypeMap = (
  name: string,
  type: string[] = ['primary', 'secondary', 'dashed', 'outline', 'text']
) => {
  return Object.fromEntries(
    type.map((v) => {
      return [v, `${name}-${v}`];
    })
  );
};
