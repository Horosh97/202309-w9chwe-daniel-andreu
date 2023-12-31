import { useCallback } from "react";
import {
  UserStructure,
  UserStructureWithoutId,
} from "../store/features/users/types";

const apiUrl = import.meta.env.VITE_API_URL;

const useUsersApi = () => {
  const getUsers = useCallback(async () => {
    const response = await fetch(apiUrl);
    const users = (await response.json()) as UserStructure[];

    return users;
  }, []);
  const addNewUser = async (
    user: UserStructureWithoutId,
  ): Promise<UserStructure> => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error();
      }
      const returnedUserFromApi = (await response.json()) as UserStructure;
      return returnedUserFromApi;
    } catch (error) {
      console.log((error as Error).message);
      const returnedUserFromApi = {} as UserStructure;
      return returnedUserFromApi;
    }
  };
  const setIsFriend = useCallback(
    async (userId: number, isFriend: boolean): Promise<void> => {
      try {
        const response = await fetch(`${apiUrl}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFriend: !isFriend }),
        });

        if (!response.ok) {
          throw new Error();
        }
      } catch {
        throw new Error();
      }
    },
    [],
  );
  return {
    getUsers,
    addNewUser,
    setIsFriend,
  };
};

export default useUsersApi;
