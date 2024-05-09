import { useParams } from "react-router-dom";
import { CommentsBlock } from "../../widgets/comments/comments";
import { Edit } from "../../widgets/editing/edit";
import Post from "../../widgets/post/post";
import { useEffect, useState } from "react";
import axios from "../../entities/services/index";
import { PostActionData } from "../../entities/store/posts/types";

export const FullPost = () => {
  const [fullPost, setFullPost] = useState<PostActionData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  console.log(isLoading);
  console.log(fullPost);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<PostActionData>(`/posts/${params.id}`)
      .then((res) => {
        setFullPost(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {}, []);
  return (
    <>
      <Post
        id={params.id}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullname: "Keff",
        }}
        createdAt={"12 июня 2022 г."}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        isFullPost>
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
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
