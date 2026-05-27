
export const generateJobId = function({
  queue,
  eventId,
}: {
  queue: string;
  eventId?: string;
}) {
  return `${eventId || Date.now()}-${queue}`;
};