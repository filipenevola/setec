export const MAX_OVERVIEW_LENGTH = 250;

export const truncate = (text, length) =>
  text && text.length > length ? `${text.substring(0, length)}...` : text;
