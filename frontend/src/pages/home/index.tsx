import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Post from "../../widgets/post/post";
import { TagsBlock } from "../../widgets/tags/tags";
import { CommentsBlock } from "../../widgets/comments/comments";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux-hooks";
import { useEffect } from "react";
import { getPosts, getTags } from "../../entities/store/posts/posts-slice";
import { PostActionData } from "../../entities/store/posts/types";

export const Home = () => {
  const dispatch = useAppDispatch();
  const postsSelector = useAppSelector((state) => state.posts.posts);
  const currentUserId = useAppSelector((state) => state.auth.data?._id);
  const { items, status } = useAppSelector((state) => state.posts.tags);

  const isTagsLoading = status === "loading";
  const isPostLoading = postsSelector.status === "loading";

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={7} item>
          {(isPostLoading ? [...Array(5)] : postsSelector.items).map(
            (item: PostActionData, index) => {
              return isPostLoading ? (
                <Post isLoading={true} key={index} />
              ) : (
                <Post
                  id={item._id}
                  title={item.title}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={{
                    avatarUrl:
                      "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                    fullname: item.user.fullname,
                  }}
                  createdAt={"12 июня 2022 г."}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isEditable={currentUserId === item.user._id}
                  key={item._id}
                />
              );
            }
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullname: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullname: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
