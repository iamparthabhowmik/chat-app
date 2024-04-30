import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user1, Admin, loggedInUser, handleFunction }) => {
  const dummyFunction = () => {};
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      cursor={loggedInUser._id === Admin._id ? "pointer" : "default"}
      onClick={loggedInUser._id === Admin._id ? handleFunction : dummyFunction}
    >
      {user1.name}
      {Admin._id === user1._id && <span> (Admin)</span>}
      {loggedInUser._id === Admin._id && <CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItem;
