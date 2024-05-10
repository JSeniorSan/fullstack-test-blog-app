import { useParams } from "react-router-dom";
import { CommentsBlock } from "../../widgets/comments/comments";
import { Edit } from "../../widgets/editing/edit";
import Post from "../../widgets/post/post";
import { useEffect, useState } from "react";
import axios from "../../entities/services/index";
import { PostActionData } from "../../entities/store/posts/types";

export const FullPost = () => {
  const [fullPost, setFullPost] = useState<PostActionData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    axios
      .get<PostActionData>(`/posts/${params.id}`)
      .then((res) => {
        setFullPost(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(fullPost);

  if (isLoading) return <Post isLoading={true} />;

  return (
    <>
      <Post
        id={params.id}
        title={fullPost?.title}
        imageUrl={fullPost?.imageUrl}
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullname: fullPost?.user.fullname,
        }}
        createdAt={fullPost?.createdAt}
        viewsCount={fullPost?.viewsCount}
        commentsCount={3}
        tags={fullPost?.tags}
        isFullPost>
        <p>{fullPost?.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullname: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullname: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}>
        <Edit />
      </CommentsBlock>
    </>
  );
};
