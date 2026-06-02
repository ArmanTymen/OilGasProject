export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'бурение':
      return '#00ff66';
    case 'спо':
      return '#ffcc00';
    case 'промывка':
      return '#3399ff';
    case 'простой':
      return '#888888';
    default:
      return '#ffffff';
  }
};

export const getStatusDisplayText = (status: string): string => {
  switch (status) {
    case 'бурение':
      return 'БУРЕНИЕ';
    case 'спо':
      return 'СПО';
    case 'промывка':
      return 'ПРОМЫВКА';
    case 'простой':
      return 'ПРОСТОЙ';
    default:
      return status.toUpperCase();
  }
};
