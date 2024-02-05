export type Group = {
  id: number;
  group: number;
  leadId: number | null;
  leadChars: number | null;
};

export type Place = {
  id: number;
  isOnHands: boolean;
  friendId: number;
  takeAt: number;
  number: number;
};

export type Friend = {
  chars: string;
  group: Group;
  groupId: number;
  id: number;
  places: Place[];
};

export type FriendDto = {
  friend: Friend;
};

export type FriendsDto = {
  friends: Friend[];
};

export type FriendsPageDto = {
  friends: Friend[];
  lastPage: number;
};

export type GroupsDto = {
  groups: Group[];
};

export type GroupDto = {
  group: Group;
};
