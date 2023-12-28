import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

/**
 * 상대적 날짜 변환
 * @param dateTime 날짜
 * @returns 상대적 날짜
 */
export default function distanceToNow(dateTime: number | Date) {
  return formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
  });
}
