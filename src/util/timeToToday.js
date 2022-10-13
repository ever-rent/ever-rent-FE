export const timeToToday = (writeAt) => {
  let createdAt = new Date(
    `${writeAt[0]}-${writeAt[1]}-${writeAt[2]} ${writeAt[3]}:${writeAt[4]}:${writeAt[5]}`
  );

  const milliSeconds = new Date() - createdAt;
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  if (minutes < 60)
    return `${Math.floor(minutes) === 0 ? 1 : Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

export const dateToTime = (createdAt) => {
  console.log("dateToTime >>", createdAt);
  console.log("dateToTime >>", new Date(createdAt));

  const milliSeconds = new Date(createdAt) - new Date();
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  if (minutes < 60)
    return `${Math.floor(minutes) === 0 ? 1 : Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
};
