import { Edit } from "../../widgets/editing/edit";
import { UserInfo } from "../../widgets/user/user-info";
import Post from "../../widgets/post/post";

const Home = () => {
  return (
    <main>
      <UserInfo additionalText="22.05.2024" fullName="Sam" avatarUrl="" />
      <Post
        _id="1"
        children
        commentsCount="10"
        createdAt="22.05"
        imageUrl=""
        isEditable
        isFullPost
        isLoading
        tags={["mem"]}
        title="Main"
        user={{ avatarUrl: "", fullName: "Sam" }}
        viewsCount="100"
      />
      <Edit />
    </main>
  );
};

export default Home;
