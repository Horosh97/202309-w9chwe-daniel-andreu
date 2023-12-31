import { useDispatch } from "react-redux";
import useUsersApi from "../../hooks/useUsersApi";
import { UserStructure } from "../../store/features/users/types";
import { toggleIsFriendActionCreator } from "../../store/features/users/usersSlice";
import UserCardStyled from "./UserCardStyled";

interface UserCardProps {
  user: UserStructure;
}

const UserCard = ({
  user: {
    name,
    username,
    birthday,
    quote,
    profilePicture,
    interests,
    isFriend,
    id,
  },
}: UserCardProps): React.ReactElement => {
  const { setIsFriend } = useUsersApi();
  const dispatch = useDispatch();

  const toggleCardIsFriend = async (id: number): Promise<void> => {
    dispatch(toggleIsFriendActionCreator(id));
    await setIsFriend(id, isFriend);
  };

  return (
    <UserCardStyled className="user">
      <div className="user__left-container">
        <img className="user__image" src={profilePicture} alt={username} />
        <div className="user__info">
          <h2 className="user__name">{name}</h2>
          <h3 className="user__username">{username}</h3>
        </div>
      </div>
      <div className="user__right-container">
        <div className="user__state">
          <h3 className="user__state-title">Estado:</h3>
          <span className="user__state-info">{quote}</span>
        </div>
        <div className="user__interests">
          <h3 className="user__interests-title">Intereses:</h3>
          <span className="user__interests-info">{interests}</span>
        </div>
        <div className="user__birthday">
          <h3 className="user__birthday-title">Fecha de nacimiento:</h3>
          <span className="user__birthday-info">{birthday}</span>
        </div>
        <div className="user__button">
          <button
            type="button"
            className={`${
              isFriend ? "button-activated" : "button-desactivated"
            }`}
            onClick={() => {
              toggleCardIsFriend(id);
            }}
          >
            Me cae bien
          </button>
          <button
            type="button"
            className={`${
              isFriend ? "button-desactivated" : "button-activated"
            }`}
            onClick={() => {
              toggleCardIsFriend(id);
            }}
          >
            Me cae mal
          </button>
        </div>
      </div>
    </UserCardStyled>
  );
};

export default UserCard;
