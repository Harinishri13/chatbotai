import { Box, Typography, Stack } from "@mui/material";
import { format, isEqual, startOfDay, add } from "date-fns";
import ChattingCard from "./ChattingCard";

export default function ChatHistoryCard({ details }) {
  const formatDate = (date) => {
    const today = startOfDay(new Date());

    if (isEqual(date, today)) {
      return `Today's chats`;
    } else if (isEqual(today, add(date, { days: 1 }))) {
      return `Yesterday's chats`;
    } else {
      return format(date, "do LLL yyyy");
    }
  };

  const conversationDate = details.time ? new Date(details.time) : new Date();

  return (
    <Box>
      <Typography fontWeight={400} mb={2}>
        {formatDate(startOfDay(conversationDate))}
      </Typography>

      <Stack spacing={{ xs: 2, md: 3 }}>
        {details.chat && details.chat.length > 0 ? (
          details.chat.map((item, index) => (
            <ChattingCard details={item} readOnly={true} key={index} />
          ))
        ) : (
          <Typography>No messages in this conversation.</Typography>
        )}
      </Stack>
    </Box>
  );
}
