import { PostUser } from "../post/post";
import styles from "./user-info.module.scss";

export interface UserInfo extends PostUser {
  additionalText: string;
}

export const UserInfo = ({ avatarUrl, fullname, additionalText }: UserInfo) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={fullname}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullname}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
